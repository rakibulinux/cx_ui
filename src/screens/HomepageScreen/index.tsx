import * as React from 'react'
import Particles from 'react-particles-js';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { HomeMarkets } from '../../containers';
import styled from 'styled-components';
import Typed from 'react-typed';

import AppStore from './assets/app_store_download.png';
import GooglePlay from './assets/google_play_download.png';
import AndroidAPK from './assets/android_apk_download.png';
import Scan from './assets/scan_download.png';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const CreateAccountFormStyles = styled.div`
    input {
        width: 460px;
        height: 60px;
        letter-spacing: 1px;
        border-width: 1px;
        border-style: solid;
        border-radius: 4px;
        font-size: 18px;
        box-sizing: border-box;
        padding: 0 12px;
        margin-right: 20px;
        margin-top: 70px;
        background-color: #1e104d;
        color: #fff;
    }

    button {
        min-width: 136px;
        height: 60px;
        border-radius: 4px;
        font-size: 18px;
        box-sizing: border-box;
        padding: 0 30px;
        background-color: #311A7E !important;
        color: #fff;
        border: none;
    }
`

export const HomepageScreen = () => {
    const data = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];

    const Transaction = () => {
        return (
            <div className="container" style={{ border: '1px solid #423D81', backgroundColor: '#1e104d', borderRadius: '5px', padding: '2rem 2rem 5rem 2rem' }}>
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
                <div className="row">
                    <div className="col-12" style={{ position: 'absolute', bottom: 0, left: 0 }}>
                        <ResponsiveContainer width='100%' aspect={4.0 / 1.0}>
                            <AreaChart
                                data={data}
                            >
                                <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
                            </AreaChart>
                        </ResponsiveContainer>

                    </div>
                </div>
            </div>
        );
    }

    const Download = () => {
        return (
            <div id="download" style={{ padding: '150px 0', backgroundColor: '#311A7E' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <div className="row" style={{ marginTop: '80px' }}>
                                <div className="col-12">
                                    <h1>Trade anytime and anywhere</h1>
                                    <h4 className="mt-5">
                                        Download CircleEx APP, you will be able to easily at any time, anywhere trading global mainstream, popular digital assets.
                                    </h4>
                                </div>
                            </div>
                            <div className="row mt-5">
                                <div className="col-6">
                                    <img className="img-fluid" src={AppStore} alt="apple+store" />
                                </div>
                                <div className="col-6">
                                    <img className="img-fluid" src={GooglePlay} alt="google+play" />
                                </div>
                                <div className="col-6 mt-3">
                                    <img className="img-fluid" src={AndroidAPK} alt="android+apk" />
                                </div>
                                <div className="col-6 mt-3">
                                    <img width="255px" src={Scan} alt="scan+qrcode" />
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <img className="img-fluid" src="https://newbikicoin.oss-cn-hangzhou.aliyuncs.com/biki/bikiIndex/422317e84cd9e6b0da2aa236fb9fc634_en.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const TokenTransaction = () => {
        return (
            <div id="token-transactions" style={{ backgroundColor: '#311A7E', marginTop: '1rem', zIndex: 1 }}>
                <div className="container" style={{ padding: '100px 0' }}>
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
            </div>

        );
    }

    const Markets = () => {
        return (
            <div className="container-fluid" style={{ padding: '100px 5%' }}>
                <div className="row">
                    <div className="col-12">
                        <HomeMarkets />
                    </div>
                </div>
            </div>
        );
    }

    const StartTrading = () => {
        return (
            <div id="start-trading" style={{ padding: '150px 0' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h1 className="text-center">Start trading on Circle Exchange</h1>
                            <h3 className="text-center">Start your trading freely in Bitcoin and many others cryptocurrencies in just 2 minutes!</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 d-flex justify-content-center align-content-center flex-fill">
                            <form className="form-group">
                                <CreateAccountFormStyles>
                                    <input type="email" placeholder="Your mobile number or email address" />
                                    <button type="submit">Create account</button>
                                </CreateAccountFormStyles>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
            slidesToSlide: 1 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 1 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };

    return (
        <React.Fragment>
            <div style={{ position: 'relative', width: '100vw', height: '80vh', zIndex: 0 }}>
                <Particles
                    style={{ position: 'absolute', width: '100%', height: '100%' }}
                    params={{ "particles": { "number": { "value": 100 } } }}
                // params={{ "particles": { "number": { "value": 300, "density": { "enable": true, "value_area": 1803.4120608655228 } }, "color": { "value": "#ffffff" }, "shape": { "type": "circle", "stroke": { "width": 2, "color": "#000000" }, "polygon": { "nb_sides": 4 }, "image": { "src": "img/github.svg", "width": 100, "height": 100 } }, "opacity": { "value": 0.5, "random": false, "anim": { "enable": false, "speed": 1, "opacity_min": 0.1, "sync": false } }, "size": { "value": 1.5, "random": true, "anim": { "enable": false, "speed": 40, "size_min": 0.1, "sync": false } }, "line_linked": { "enable": true, "distance": 0, "color": "#ffffff", "opacity": 0.3687847739990702, "width": 0.6413648243462091 }, "move": { "enable": true, "speed": 6, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false, "attract": { "enable": false, "rotateX": 600, "rotateY": 1200 } } }, "interactivity": { "detect_on": "window", "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": false, "mode": "bubble" }, "resize": true }, "modes": { "grab": { "distance": 400, "line_linked": { "opacity": 1 } }, "bubble": { "distance": 400, "size": 40, "duration": 2, "opacity": 8, }, "repulse": { "distance": 100, "duration": 0.4 }, "push": { "particles_nb": 4 }, "remove": { "particles_nb": 2 } } }, }}
                />


                <div style={{ position: 'absolute', top: '100px', left: 0, width: '100%', height: '20%' }}>
                    <h1 className="text-center" style={{ fontSize: '6rem' }}>Circle Exchange</h1>
                    <h2 className="text-center">
                        <Typed
                            strings={['Trade Bitcoin, Ethereum and other cryptos instantly', 'Secure / Stable / Reliable']}
                            typeSpeed={25}
                            backSpeed={15}
                            loop
                        />
                    </h2>
                </div>
                <div className="container-fluid" style={{ position: 'absolute', bottom: 0, padding: '0 50px' }}>
                    <div className="row">
                        <div className="col-12">
                            <Carousel
                                responsive={responsive}
                                swipeable={false}
                                draggable={false}
                                showDots={true}
                                infinite={true}
                                autoPlay={true}
                                autoPlaySpeed={3000}
                                keyBoardControl={true}
                            >
                                <img className="img-fluid" style={{ padding: '0 1rem' }} src="https://staticprod.mpuuss.top/cms/banner/2021030911283002328.jpg" />
                                <img className="img-fluid" style={{ padding: '0 1rem' }} src="https://staticprod.mpuuss.top/cms/banner/2021030819280630536.jpg" />
                                <img className="img-fluid" style={{ padding: '0 1rem' }} src="https://staticprod.mpuuss.top/cms/banner/2021030519362210571.jpg" />
                                <img className="img-fluid" style={{ padding: '0 1rem' }} src="https://staticprod.mpuuss.top/cms/banner/2021030911283002328.jpg" />
                                <img className="img-fluid" style={{ padding: '0 1rem' }} src="https://staticprod.mpuuss.top/cms/banner/2021030819280630536.jpg" />
                                <img className="img-fluid" style={{ padding: '0 1rem' }} src="https://staticprod.mpuuss.top/cms/banner/2021030519362210571.jpg" />
                                <img className="img-fluid" style={{ padding: '0 1rem' }} src="https://staticprod.mpuuss.top/cms/banner/2021030911283002328.jpg" />
                                <img className="img-fluid" style={{ padding: '0 1rem' }} src="https://staticprod.mpuuss.top/cms/banner/2021030819280630536.jpg" />
                                <img className="img-fluid" style={{ padding: '0 1rem' }} src="https://staticprod.mpuuss.top/cms/banner/2021030519362210571.jpg" />
                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>

            {TokenTransaction()}
            {Markets()}
            {Download()}
            {StartTrading()}
        </React.Fragment>

    )
}
