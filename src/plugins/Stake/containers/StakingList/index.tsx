import * as React from 'react';
import { Stake } from '../../../../modules';
import { StakingItem } from '../../components';
interface StakingListProps {
    staking_list: Stake[];
}
export const StakingList: React.FC<StakingListProps> = (props: StakingListProps) => {
    const { staking_list } = props;
    return (
        <React.Fragment>
            {
                staking_list.length > 0 ?
                    staking_list.map((staking: Stake) => (
                        <div className="col-lg-4 col-md-6 mb-5" key={staking.staking_id}>
                            <StakingItem
                                key={staking.staking_id}
                                staking_id={staking.staking_id}
                                currency_id={staking.currency_id}
                                staking_name={staking.staking_name}
                                rewards={staking.rewards}
                                active={staking.active}
                                icon_url={staking.icon_url}
                                status={staking.status}
                                description={staking.description}
                                start_time={staking.start_time}
                                end_time={staking.end_time}
                            />
                        </div>
                    ))
                    :
                    <div className="text-center w-100">
                        <div className="spinner-border" style={{ marginTop: "200px" }} role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
            }
        </React.Fragment>
    )
}
