import * as React from 'react';
import { CompetitionInfo, PrizeTable } from '../../containers';
import './TradingCompetitionDetailMobileScreen.css';
import { Col, message, Row } from 'antd';
import { RankingTable } from '../../containers';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { findCompetitionbyId, selectCompetitionItem, selectUserInfo } from '../../../../../modules';

// axios
import pluginAPI from '../../../api/index';

export interface Prize {
    rank: string;
    award: string;
}

export interface Prizes {
    competition_id: number | string;
    prizes: Prize[]
}

const prizeList: Prizes[] = [
    {
        competition_id: 1,
        prizes: [
            {
                rank: '1',
                award: '1,000,000 SWP and 150 USDT'
            },
            {
                rank: '2',
                award: '500,000 SWP and 50 USDT'
            },
            {
                rank: '3',
                award: '200,000 SWP'
            },
            {
                rank: '4',
                award: '70,000 SWP'
            },
            {
                rank: '5',
                award: '50,000 SWP'
            },
            {
                rank: '6',
                award: '30,000 SWP'
            },
            {
                rank: '7',
                award: '25,000 SWP'
            },
            {
                rank: '8',
                award: '25,000 SWP'
            },
            {
                rank: '9',
                award: '25,000 SWP'
            },
            {
                rank: '10',
                award: '25,000 SWP'
            },
            {
                rank: '11',
                award: '25,000 SWP'
            },
            {
                rank: '12',
                award: '25,000 SWP'
            }
        ]
    },

    {
        competition_id: 2,
        prizes: [
            {
                rank: '1',
                award: '4000 EOC and 150 USDT'
            },
            {
                rank: '2',
                award: '2000 EOC and 50 USDT'
            },
            {
                rank: '3',
                award: '1000 EOC'
            },
            {
                rank: '4',
                award: '500 EOC'
            },
            {
                rank: '5',
                award: '500 EOC'
            },
            {
                rank: '6',
                award: '500 EOC'
            },
            {
                rank: '7',
                award: '500 EOC'
            },
            {
                rank: '8',
                award: '500 EOC'
            },
            {
                rank: '9',
                award: '500 EOC'
            },
            {
                rank: '10',
                award: '500 EOC'
            },
        ]
    },

    {
        competition_id: 3,
        prizes: [
            {
                rank: '1',
                award: '20,000 DOGY'
            },
            {
                rank: '2',
                award: '10,000 DOGY'
            },
            {
                rank: '3',
                award: '5,000 DOGY'
            },
            {
                rank: '4',
                award: '3,000 DOGY'
            },
            {
                rank: '5',
                award: '3,000 DOGY'
            },
            {
                rank: '6',
                award: '3,000 DOGY'
            },
            {
                rank: '7',
                award: '3,000 DOGY'
            },
            {
                rank: '8',
                award: '3,000 DOGY'
            }
        ]
    },

    {
        competition_id: 4,
        prizes: [
            {
                rank: '1',
                award: '40,000 GHD'
            },
            {
                rank: '2',
                award: '30,000 GHD'
            },
            {
                rank: '3',
                award: '25,000 GHD'
            },
            {
                rank: '4',
                award: '10,000 GHD'
            },
            {
                rank: '5',
                award: '8,000 GHD'
            },
            {
                rank: '6',
                award: '7,000 GHD'
            },
            {
                rank: '7',
                award: '5,000 GHD'
            },
            {
                rank: '8',
                award: '5,000 GHD'
            },
            {
                rank: '9',
                award: '5,000 GHD'
            },
            {
                rank: '10',
                award: '5,000 GHD'
            },
            {
                rank: '11',
                award: '1,500 GHD'
            },
            {
                rank: '12',
                award: '1,500 GHD'
            },
            {
                rank: '13',
                award: '1,500 GHD'
            },
            {
                rank: '14',
                award: '1,500 GHD'
            },
            {
                rank: '15',
                award: '1,500 GHD'
            },
            {
                rank: '16',
                award: '1,500 GHD'
            },
            {
                rank: '17',
                award: '1,500 GHD'
            },
            {
                rank: '18',
                award: '1,500 GHD'
            },
            {
                rank: '19',
                award: '1,500 GHD'
            },
            {
                rank: '20',
                award: '1,500 GHD'
            }
        ]
    },

    {
        competition_id: 5,
        prizes: [
            {
                rank: '1',
                award: '20,000 TDI'
            },
            {
                rank: '2',
                award: '7,500 TDI'
            },
            {
                rank: '3',
                award: '5,000 TDI'
            },
            {
                rank: '4',
                award: '2,500 TDI'
            },
            {
                rank: '5',
                award: '1,500 TDI'
            },
            {
                rank: '6',
                award: '1,000 TDI'
            },
        ]
    },
]

export const TradingCompetitionDetailMobileScreen: React.FC = () => {
    const [rankOfUserState, setRankOfUserState] = React.useState(-1);
    const [volumnOfUserState, setVolumnOfUserState] = React.useState(0);

    const { competition_id } = useParams<{ competition_id: string }>();
    const competition = useSelector(selectCompetitionItem);
    const user = useSelector(selectUserInfo);

    const dispatch = useDispatch();
    const dispatchFetchCompetitionItemByID = (ieoID) => dispatch(findCompetitionbyId({
        id: ieoID
    }));

    React.useEffect(() => {
        if (competition.loading) {
            message.loading('Waiting a seconds...', 0);
        } else {
            message.destroy();
        }
        return function cleanup() {
            message.destroy();
        }
    }, [competition.loading]);

    React.useEffect(() => {
        dispatchFetchCompetitionItemByID(competition_id);
    }, []);

    React.useEffect(() => {
        if (user.uid !== '') {
            pluginAPI.get(`/ranks/fetchByUid/competition_id=${competition_id}&uid=${user.uid}`)
                .then(res => {
                    const data = res.data;
                    if (data.payload.rank) {
                        setRankOfUserState(data.payload.rank);
                        setVolumnOfUserState(Number(data.payload.volumn))
                    }
                })
                .catch(err => {
                });

        }
    }, [user.uid]);

    const prizeOfCompetition = prizeList.find(prize => prize.competition_id == competition_id);
    
    const renderTradingInfo = () => {
        if (prizeOfCompetition) {
            return (
                <Row gutter={[16, 16]}>
                    <Col span={24}><CompetitionInfo volumn={volumnOfUserState} /></Col>
                    <Col span={24}><PrizeTable prizes={[...prizeOfCompetition.prizes]} /></Col>
                </Row>
            );
        }
        return (
            <Row gutter={[16, 16]}>
                <Col span={24}><CompetitionInfo volumn={volumnOfUserState} /></Col>
            </Row>
        );
    }

    return (
        <div id="trading-competition-detail-mobile-moible-screen">
            <div id="trading-competition-detail-mobile__info" className="container-fluid">
                {renderTradingInfo()}
            </div>
            <div id="trading-competition-detail-mobile__ranks" className="container-fluid">
                <RankingTable competition_id={competition_id} rank={rankOfUserState} prizes={prizeOfCompetition}/>
            </div>
        </div>
    );
}
