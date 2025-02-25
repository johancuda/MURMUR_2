let images = document.querySelectorAll('.overlay');

images.forEach(img => {
    img.addEventListener('click', (e) => {
        if(img.parentElement.classList.contains('focused')) {
            document.querySelectorAll('#main >*:not(.focused)').forEach(e => e.style.filter = "");
            img.parentElement.classList.remove('focused')
        } else {
        document.querySelectorAll('#main >*').forEach(e => {
            e.style.filter = ""
            if(e.classList.contains('focused')) {e.classList.remove('focused')}
        });
        img.parentElement.classList.add('focused')
        document.querySelectorAll('#main >*:not(.focused)').forEach(e => e.style.filter = "blur(2px)");
        }
    })
});