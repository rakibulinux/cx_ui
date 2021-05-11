import * as React from 'react'
import styled from 'styled-components';

interface StakingInfoProps {
    event_name: string;
    prize_string: string;
    logo_image: string;
}

const StakingInfoStyles = styled.div`
    background-color: #fff;
    padding: 40px;
    #event {
        .event-image {
            margin-right: 20px;
            flex: 0 0 100px;
            img {
                max-width: 100%;
                 max-height: 50%;
            }
        }
       
        .event-info {
            display:flex;
            flex-direction: column;
            &__name {
                color: #000;
                font-size: 2rem;
            }
            &__prize {
               font-size: 1rem;
            }
        }
    }
    .buttons {
        display: flex;
        flex-direction: column;
        .trade-btn, .view-detail-btn {
            color: #fff;
            cursor: pointer;
            border: none;
            padding: 10px 20px;
            font-size: 14px;
            font-weight: 700;
            margin-bottom: 8px;
            outline: none;
            transition: background-color .2s;
        }
        .trade-btn {
            border: 1px solid #30B57E;
            background-color: #30B57E;
        }
        .view-detail-btn {
            color: #000;
        }
    }
   
`;

export const StakingInfo: React.FC<StakingInfoProps> = (props: StakingInfoProps) => {
    const { event_name, prize_string, logo_image } = props;
    return (
        <StakingInfoStyles>
            <div className="row">
                <div id="event" className="col-10 d-flex flex-row">
                    <div className="event-image">
                        <img src={logo_image} alt="" />
                    </div>
                    <div className="event-info">
                        <span className="event-info__name">{event_name}</span>
                        <span className="event-info__prize">
                            {prize_string}
                        </span>
                    </div>
                </div>
                <div className="col-2 buttons">
                    <button className="trade-btn">Trade VLX</button>
                    <button className="view-detail-btn">View Details</button>
                </div>
            </div>
        </StakingInfoStyles>
    )
}
