import * as React from 'react';
import { Staking } from '../../../../modules';
import { StakingItem } from '../../components';
interface StakingListProps {
    staking_list: Staking[];
}
export const StakingList: React.FC<StakingListProps> = (props: StakingListProps) => {
    const { staking_list } = props;
    return (
        <React.Fragment>
            {
                staking_list.length > 0 ?
                staking_list.map(staking => (
                    <div className="col-lg-4 col-md-6 mb-5">
                        <StakingItem
                            key={staking.staking_id}
                            staking_id={staking.staking_id}
                            currency_id={staking.currency_id}
                            staking_name={staking.staking_name}
                            rewards={staking.rewards}
                            active={staking.active}
                            icon_url={staking.icon_url}
                        />
                    </div>
                ))
                :
                <div>
                Staking is unavailabe
            </div>
            }
        </React.Fragment>
    )
}
