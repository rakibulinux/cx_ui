import * as React from 'react'
import Particles from 'react-particles-js';

export const HomepageScreen = () => {

    const Transaction = () => {

        return (
            <div className="container" style={{ border: '1px solid #423D81', borderRadius: '5px', padding: '2rem 1.5rem' }}>
                <div className="row">
                    <div className="col-12">
                        BIKI/USDT
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <strong
                            className="text-danger"
                            style={{ fontSize: '2rem' }}>
                            0.04095
                        </strong> = <span className="text-secondary">$.0.04</span>
                    </div>
                </div>
            </div>
        );
    }

    const TokenTransaction = () => {
        return (
            <div className="container" style={{ paddingBottom: '100px' }}>
                <div className="row">
                    <div className="col-12">
                        <h1 className="text-center">Supports global and popular token transactions</h1>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-3">
                        <Transaction />
                    </div>
                    <div className="col-3">
                        <Transaction />
                    </div>
                    <div className="col-3">
                        <Transaction />
                    </div>
                    <div className="col-3">
                        <Transaction />
                    </div>
                </div>
            </div>
        );
    }
    return (
        <React.Fragment>
            <div>
                <Particles
                    params={{ "particles": { "number": { "value": 150, "density": { "enable": true, "value_area": 1803.4120608655228 } }, "color": { "value": "#ffffff" }, "shape": { "type": "circle", "stroke": { "width": 2, "color": "#000000" }, "polygon": { "nb_sides": 4 }, "image": { "src": "img/github.svg", "width": 100, "height": 100 } }, "opacity": { "value": 0.5, "random": false, "anim": { "enable": false, "speed": 1, "opacity_min": 0.1, "sync": false } }, "size": { "value": 1.5, "random": true, "anim": { "enable": false, "speed": 40, "size_min": 0.1, "sync": false } }, "line_linked": { "enable": true, "distance": 0, "color": "#ffffff", "opacity": 0.3687847739990702, "width": 0.6413648243462091 }, "move": { "enable": true, "speed": 6, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false, "attract": { "enable": false, "rotateX": 600, "rotateY": 1200 } } }, "interactivity": { "detect_on": "window", "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": false, "mode": "bubble" }, "resize": true }, "modes": { "grab": { "distance": 400, "line_linked": { "opacity": 1 } }, "bubble": { "distance": 400, "size": 40, "duration": 2, "opacity": 8, }, "repulse": { "distance": 100, "duration": 0.4 }, "push": { "particles_nb": 4 }, "remove": { "particles_nb": 2 } } }, }}
                />
            </div>
            {TokenTransaction()}
        </React.Fragment>

    )
}
