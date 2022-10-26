import React from 'react'
import '../firstPage/fitst.css'
import './secondPage.css'
import { ResponsiveContainer, Cell, PieChart, Pie, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Label, Legend, Bar, LabelList } from 'recharts'
import color from '../helper/color'
import data from '../data'

const SecondPage = ({
    InlineFlagStatus,
    InlineDhuCpTf,
    WorkerWiseFlagRatio,
    MachineWiseFlagRatio,
    OprationWiseFaultRatio,
    TopBestAndWordWorkers
}) => {

    const data1 = []

    const wwfg = WorkerWiseFlagRatio.reduce((pre, cur, index, arr) => {
        const dup = pre.find(i => i.WorkerID === cur.WorkerID)
        if (dup) {
            dup[cur.RoundColor] = dup[cur.RoundColor] + 1;
            return pre;
        }
        return [
            ...pre,
            {
                ...cur,
                RED: cur.RoundColor === 'RED' ? 1 : 0,
                GREEN: cur.RoundColor === 'GREEN' ? 1 : 0,
                YELLOW: cur.RoundColor === 'YELLOW' ? 1 : 0,
                BLUE: cur.RoundColor === 'BLUE' ? 1 : 0,
            }
        ]
    }, [])


    const mwfg = MachineWiseFlagRatio.reduce((pre, cur) => {
        const dup = pre.find(i => i.MachineID === cur.MachineID)
        if (dup) {
            dup[cur.RoundColor] = dup[cur.RoundColor] + 1;
            return pre;
        }
        return [
            ...pre,
            {
                ...cur,
                RED: cur.RoundColor === 'RED' ? 1 : 0,
                GREEN: cur.RoundColor === 'GREEN' ? 1 : 0,
                YELLOW: cur.RoundColor === 'YELLOW' ? 1 : 0,
                BLUE: cur.RoundColor === 'BLUE' ? 1 : 0,
            }
        ]
    }, [])

    return (
        <div className='container'>
            <div className="upperContainer">
                <div className="upperContainerInner">Endline Line 3 Section Assembly 1</div>
            </div>
            <div className="bottomContainer">
                <div className="bottomInner">
                    {/* different part from first */}
                    <div className="sfirstContainer">
                        <div className="sfNumberContainer">
                            <div className="sfNumberInner">
                                <div className="sfnumberHeader">Today DHU</div>
                                <div className="sfNumberBottom">{InlineDhuCpTf[0].TodayDHU + "%"}</div>
                            </div>
                        </div>
                        <div className="sfNumberContainer">
                            <div className="sfNumberInner">
                                <div className="sfnumberHeader">Checked Pieces</div>
                                <div className="sfNumberBottom">{InlineDhuCpTf[0].CheckedPcs}</div>
                            </div>
                        </div>
                        <div className="sfNumberContainer">
                            <div className="sfNumberInner">
                                <div className="sfnumberHeader">Today Faults</div>
                                <div className="sfNumberBottom">{InlineDhuCpTf[0].TotalFaults}</div>
                            </div>
                        </div>
                        <div className="sfPieContainer">
                            <div className="sfPidContainerInner">
                                <div className="sfPieHeader">Inline Flag Status</div>
                                <div className="sfPieChart">
                                    <ResponsiveContainer>
                                        <PieChart width='100%' height='100%'>
                                            <Label fill='black' />
                                            <Legend layout='vertical' align='right' iconType="circle" iconSize={10} verticalAlign='middle' margin={{top: 0, left: 0, right: 0, bottom: 0}}>
                                            </Legend>
                                            <Pie data={InlineFlagStatus} dataKey="RoundTotal" nameKey="name" cx="50%" cy="50%" outerRadius="80%" label stroke='none' >
                                                {
                                                    InlineFlagStatus.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.RoundColor==="RED"? "#FF0E15": entry.RoundColor==="GREEN"? "#2D8956": entry.RoundColor==="YELLOW"? "#EAC93B": "blue" } />
                                                    ))
                                                }
                                            </Pie>
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="sSecondContainer">
                        <div className="ssInnerContainer">
                            <div className="ssHeader">Worker Wise Flag Ratio</div>
                            <div className="stackedChatContainer">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart width="100%" height="100%" data={wwfg} >
                                        <Legend verticalAlign='top'  iconType="circle" iconSize={10} height={5} align='left' wrapperStyle={{fontSize:"12px",textAlign:'justify'}} />
                                        <XAxis dataKey="WorkerCode" strokeWidth={0} angle="90" >
                                        </XAxis>
                                        <Tooltip />
                                        {/* <YAxis /> */}
                                        <Bar dataKey="RED" stackId="a" fill="#FF0E15" >
                                            {/* <LabelList position="center" /> */}
                                        </Bar>
                                        <Bar dataKey="BLUE" stackId="a" fill="blue" >
                                            {/* <LabelList position="center" /> */}
                                        </Bar>
                                        <Bar dataKey="GREEN" stackId="a" fill="#2D8956" >
                                            {/* <LabelList position="center" /> */}
                                        </Bar>
                                        <Bar dataKey="YELLOW" stackId="a" fill="#EAC93B" >
                                            {/* <LabelList position="center" /> */}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                    <div className="sSecondContainer">
                        <div className="ssInnerContainer">
                            <div className="ssHeader">Machine Wise Flag Ratio</div>
                            <div className="stackedChatContainer">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart width='100%' height='100%' data={mwfg} >
                                        {/* <CartesianGrid /> */}
                                        <XAxis dataKey="MachineCode" strokeWidth={0} />
                                        {/* <YAxis /> */}
                                        <Legend wrapperStyle={{ top: 0 }} />
                                        <Bar dataKey="RED" stackId="a" fill="#FF0E15" >
                                            {/* <LabelList position="center" /> */}
                                        </Bar>
                                        <Bar dataKey="GREEN" stackId="a" fill="#2D8956">
                                            {/* <LabelList position="center" /> */}
                                        </Bar>
                                        <Bar dataKey="BLUE" stackId="a" fill="blue" >
                                            {/* <LabelList position="center" /> */}
                                        </Bar>
                                        <Bar dataKey="YELLOW" stackId="a" fill="#EAC93B" >
                                            {/* <LabelList position="center" /> */}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                    <div className="sFourthContaier">
                        <div className="sfourInner">
                            <div className="sfourHeader">Top Best & Worst Workers</div>
                            <div className="sfoutChartContainer">
                                <ResponsiveContainer width='100%' height='100%'>
                                    <BarChart width='100%' height='100%' data={TopBestAndWordWorkers}>
                                        {/* <CartesianGrid strokeDasharray="3 3" /> */}
                                        <XAxis dataKey="WorkerCode" />
                                        {/* <YAxis /> */}
                                        <Tooltip />
                                        {/* <Legend /> */}
                                        <Bar dataKey="TodayDHU" fill="#8884d8" markerHeight="40%" >
                                            <LabelList dataKey='TodayDHU' position='top' />
                                            {
                                                TopBestAndWordWorkers.map((item,index)=>(
                                                    <Cell key={index} fill={color(index,TopBestAndWordWorkers.length)}/>
                                                ))
                                            }
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                    <div className="sFiveContainer">
                        <div className="sfourInner">
                            <div className="sfourHeader">Operations Wise Fault Ratio</div>
                            <div className="sfoutChartContainer">
                                <ResponsiveContainer width='100%' height='100%'>
                                    <BarChart width='100%' height='100%' data={OprationWiseFaultRatio} >
                                        {/* <CartesianGrid strokeDasharray="3 3" /> */}
                                        <Legend wrapperStyle={{top:0}} />
                                        {/* <XAxis dataKey="name" /> */}
                                        {/* <YAxis /> */}
                                        <Tooltip />
                                        {/* <Legend /> */}
                                        <Bar dataKey="CheckedPcs" fill="#2D8956">
                                            <LabelList dataKey='pv' position='top' />
                                        </Bar>
                                        <Bar dataKey="DefectedPcs" fill="#FF0E15"  >
                                            <LabelList dataKey='uv' position='top' />
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SecondPage
