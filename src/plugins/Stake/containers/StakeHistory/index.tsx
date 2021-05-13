import *  as React from 'react'
import { getTimeZone } from '../../../../helpers'

export const StakeHistory = () => {

    return (
        <div>
            <div>
                <span className="text-white text-right float-right">Timezone: GMT{getTimeZone()}</span>
            </div>
            <br />
            <div>
                <hr />
                <h5 className="text-center">No matching information</h5>
                <hr />
            </div>
        </div>
    )
}
