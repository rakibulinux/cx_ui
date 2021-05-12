import * as React from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectCurrencies } from '../../../../modules';

interface StakingInfoProps {
    currency_id: string;
    staking_name: string;
    description: string;
    logo_image: string;
}

const StakingInfoStyles = styled.div`
    background-color: #313445;
    box-shadow: 0px 4px 8px -2px rgba(0, 0, 0, 0.15);
    border-radius: 10px;
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
                color: #fff;
                font-size: 2rem;
            }
            &__description {
                color: #fff;
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
    const { staking_name, description, currency_id } = props;
    const currencies = useSelector(selectCurrencies);
    const getCryptoIcon = (currency_id: string): string => {
        
        const currency = currencies.find((currency: any) => currency.id === currency_id);
        try {
            return require(`../../../../../node_modules/cryptocurrency-icons/128/color/${currency_id.toLowerCase()}.png`);
        } catch (err) {
            if (currency) return currency.icon_url;
            return require('../../../../../node_modules/cryptocurrency-icons/svg/color/generic.svg');
        }
    };

    return (
        <StakingInfoStyles>
            <div className="row">
                <div id="event" className="col-10 d-flex flex-row">
                    <div className="event-image">
                        <img src={getCryptoIcon(currency_id)} alt={currency_id} />
                    </div>
                    <div className="event-info">
                        <span className="event-info__name">{staking_name}</span>
                        <span className="event-info__description">
                            {description}
                        </span>
                    </div>
                </div>
                <div className="col-2 buttons">
                    <button className="trade-btn">Trade {currency_id.toUpperCase()}</button>
                    <button className="view-detail-btn">View Details</button>
                </div>
            </div>
        </StakingInfoStyles>
    )
}
