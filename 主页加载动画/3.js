let loader_anim__intro = anime.timeline();

loader_anim__intro.add({
    targets: '.animFill',
    scale: {
        value: .5,
        elasticity: 400
    },
    opacity: 1,
    duration: 500
}).add({
    targets: '.animItem',
    scale: 1,
    elasticity: 800,
    complete: function () {
        loader_anim__spin.play();
    }
}).add({
    targets: '.animText_letter',
    marginTop: '0px',
    opacity: .9,
    offset: '-=800',
    delay: function (el, i, l) {
        return i * 100;
    },
    complete: function () {
        loader_anim__textQuirk.play();
    }
}).add({
    targets: '.animLoaderBar',
    // Replace with loading %
    width: [{ value: 0 }, { value: '30%' }, { value: '60%' }, { value: '90%' }, { value: '100%' }],
    duration: 6000,
    elasticity: 10
}).add({
    targets: '.animLoaderBar',
    height: '100%',
    duration: 800
}).add({
    targets: '#loader_container',
    top: '100%',
    duration: 800,
    elasticity: 0
});

let loader_anim__spin = anime({
    targets: '.animItem',
    rotate: "20turn",
    easing: "ease-in-out",
    loop: true,
    easing: 'easeInOutExpo',
    duration: 5000,
    delay: 200,
    autoplay: false
});

let loader_anim__textQuirk = anime({
    targets: '.animText_letter',
    rotate: function () { return anime.random(-45, 45); },
    duration: function () { return anime.random(1000, 2000) },
    delay: function (el, i, l) {
        return i * 400;
    },
    direction: 'alternate',
    easing: 'easeInOutExpo',
    loop: true,
    autoplay: false
});

