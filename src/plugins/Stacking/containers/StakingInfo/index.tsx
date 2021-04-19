import * as React from 'react'
import styled from 'styled-components';

interface StakingInfoProps {
    event_name: string;
    prize_string: string;
    logo_image: string;
}

const StakingInfoStyles = styled.div`
    .logo-image-box {
        margin-right: 20px;
        flex: 0 0 40px;

        img {
            width: 100%;
            height: 100%;
        }
    }

    .trade-btn {
        background-color: #4231c8;
        color: #fff;
        cursor: pointer;
        border: 1px solid #4231c8;
        padding: 10px 20px;
        font-size: 14px;
        font-weight: 700;
        margin-bottom: 8px;
        transition: background-color .2s;
    }
`;

export const StakingInfo: React.FC<StakingInfoProps> = (props: StakingInfoProps) => {
    const {event_name, prize_string, logo_image } = props;
    return (
        <StakingInfoStyles>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-6 d-flex flex-row">
                        <div className="logo-image-box">
                            <img src={logo_image} alt=""/>
                        </div>
                        <div>
                            <h3>{event_name}</h3>
                            <span>
                                {prize_string}
                            </span>
                        </div>
                    </div>
                    <div className="col-6">
                        <button className="trade-btn">Trade VLX</button>
                        <button>View Details</button>
                    </div>
                </div>
            </div>
        </StakingInfoStyles>
    )
}
