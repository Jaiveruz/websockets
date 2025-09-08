
const lbPending = document.querySelector('#lbl-pending');
const deskHeader = document.querySelector('h1');
const noMoreAlert = document.querySelector('.alert');
const currentTicketLabel = document.querySelector('small');

const btnDraw = document.querySelector('#btn-draw');
const btnDone = document.querySelector('#btn-done');

const searchParams = new URLSearchParams( window.location.search );

if ( !searchParams.has('escritorio') ) {
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');
}

const deskNumber = searchParams.get('escritorio');
let workingOnTicket = null;
deskHeader.innerText = deskNumber;

function checkTicketCount( currentCount = 0 ) {
    if ( currentCount === 0 ) {
        noMoreAlert.classList.remove('d-none');
    } else {
        noMoreAlert.classList.add('d-none');
    }
    lbPending.innerText = currentCount;
}

async function loadInitialCount() {
    const pendingTickets = await fetch('/api/ticket/pending').then(res => res.json());
    checkTicketCount( pendingTickets.length );
}

async function getTicket() {
    await finishTicket();
    
    const { status, ticket, message } = await fetch(`/api/ticket/draw/${ deskNumber }`)
        .then(res => res.json());

    if ( status === 'error') {
        currentTicketLabel.innerText = message;
        return;
    }

    workingOnTicket = ticket;
    currentTicketLabel.innerText = ticket.number;

}

async function finishTicket() {
    if ( !workingOnTicket ) return;

    const { status, message } = await fetch(`/api/ticket/done/${ workingOnTicket.id }`, {
        method: 'PUT'
    }).then(res => res.json());

    if ( status == 'ok' ) {
        workingOnTicket = null;
        currentTicketLabel.innerText = 'Nadie';
    }
}

function connectToWebSockets() {

  const socket = new WebSocket( 'ws://localhost:3000/ws' );

  socket.onmessage = ( event ) => {
    const { type, payload } = JSON.parse( event.data );

    if ( type !== 'on-ticket-count-changed' ) return; 
    checkTicketCount( payload );
  };

  socket.onclose = ( event ) => {
    console.log( 'Connection closed' );
    setTimeout( () => {
      console.log( 'retrying to connect' );
      connectToWebSockets();
    }, 1500 );

  };

  socket.onopen = ( event ) => {
    console.log( 'Connected' );
  };

}

btnDraw.addEventListener( 'click', getTicket );
btnDone.addEventListener( 'click', finishTicket );

loadInitialCount();
connectToWebSockets();

