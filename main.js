const primary = document.querySelector('#primary')
// widen the content div, do not leave wide gaps at the sides
primary.style.width = '100%'

const rootComments = [...document.querySelectorAll('.depth-1')]
rootComments
.map(elem => {
	elem.maxDate = [...elem.querySelectorAll('time')].reduce((max,t)=> {
		const dt = new Date(t.getAttribute('datetime'))
		return dt > max ? dt : max 
	}, 0)
	return elem
})
// sort root comments by date of the most recent child comment
.sort((a,b)=> a.maxDate > b.maxDate ? -1 : 1)
.forEach(elem => elem.parentNode.appendChild(elem))

const hash = window.location.hash
// check if the URL is meant to open a specific comment
const commentId = hash.startsWith('#comment-') && `div-${hash.slice(1)}`

// collapse all comment bodies unless the URL references it
const commentBodies = [...document.querySelectorAll('.comment-body')]
commentBodies.forEach(elem => {
	// do not collapse a comment that is meant to be opened via a URL hash
	elem.isCollapsed = elem.id !== commentId
	elem.style.maxHeight = elem.isCollapsed ? '65px' : ''
	elem.style.marginBottom = '0.5em'
	elem.style.overflow = 'hidden'
	elem.onclick = toggleBody
	elem.onmouseover = highlightBody
	elem.onmouseout = unhighlightBody
});

function toggleBody() {
	const elem = this
	elem.style.maxHeight = elem.isCollapsed ? '' : '65px';
	elem.isCollapsed = !elem.isCollapsed
}

function highlightBody() {
	const elem = this
	elem.style.cursor = 'pointer'
}

function unhighlightBody() {
	const elem = this
	elem.style.cursor = ''
}

