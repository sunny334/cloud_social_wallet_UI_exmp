import './Tabs.css'
import {Tabs} from "../types/global";
import {Link} from "react-router-dom";

const TabsContainenr = ({tabs, activeKey}: { tabs: Tabs, activeKey: string }) => {
    return (
        <div className="tabs">
            {
                tabs.map((tab) => {
                    return (
                        <div className="tab-2" key={tab.key}>
                            <Link to={tab.path}>{tab.title}</Link>
                            <input id={`tab2-${tab.key}`} name="tabs-two" type="radio" checked={tab.key === activeKey}/>
                            <div>
                                {tab.component}
                            </div>
                        </div>
                    )
                })
            }
        </div>)
}

export default TabsContainenr