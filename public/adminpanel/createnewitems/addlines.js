var textarea = document.getElementsByClassName('longdesc')[0];

textarea.addEventListener('input', resize);

function resize(_e) {
    var event = _e || event || window.event;
    var getElement = event.target || event.srcElement;
        getElement.style.height = "auto"; 
        getElement.style.height = Math.max(getElement.scrollHeight, getElement.offsetHeight)+"px"
            }