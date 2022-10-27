import React from 'react'
import '../firstPage/fitst.css'
import './secondPage.css'
import { ResponsiveContainer, Cell, PieChart, Pie, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Label, Legend, Bar, LabelList } from 'recharts'
import color from '../helper/color'
import data from '../data'

const SecondPage = ({
    params,
    InlineFlagStatus,
    InlineDhuCpTf,
    WorkerWiseFlagRatio,
    MachineWiseFlagRatio,
    OprationWiseFaultRatio,
    TopBestAndWordWorkers
}) => {

    const renderLegend = (props) => {
        const { payload } = props;
        // console.log("prop@@", props);
        return (
            <ul>
                {
                    payload.map((entry, index) => (
                        <li key={`item-${index}`} style={{color:entry.payload.RoundColor, fontSize:'12px'}} >{entry.payload.RoundColor}</li>
                    ))
                }
            </ul>
        );
    };

    const CustomLabel = (props) => {
        const { x, y, fill, value, postFix } = props
        return <text
            x={x}
            y={y}
            dy={30}
            dx={7}
            fontSize='16'
            fill='#222'
            textAnchor='right'
        >
            {value === 0 ? "" : value}
        </text>
    }

    const data1 = []

    const ifs = InlineFlagStatus.map((item,index)=>({ value: item.RoundColor} ))
    // console.log(ifs);

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
    // console.log(wwfg);


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

    const tbaww = TopBestAndWordWorkers.map((item, index) => ({ ...item, DhuPercent: `${item.TodayDHU}%` }))
    // console.log(tbaww);

    return (
        <div className='container'>
            <div className="upperContainer">
                <div className="upperContainerInner">Endline Line {params.lineID} Section Assembly {params.sectionID}</div>
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
                                        <PieChart width='100%' height='100%' data={InlineFlagStatus}>
                                            <Label fill='black' fontSize={25} />
                                            <Legend
                                                layout='vertical'
                                                align='right'
                                                iconType="circle"
                                                iconSize={10}
                                                verticalAlign='middle'
                                                // margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
                                                content={renderLegend}
                                            />
                                            <Pie data={InlineFlagStatus} dataKey="RoundTotal" strokeWidth={0} nameKey="name" cx="50%" cy="50%" outerRadius="80%" label stroke='none' >
                                                {
                                                    InlineFlagStatus.map((entry, index) => (
                                                        <Cell fontSize={20} key={`cell-${index}`} fill={entry.RoundColor === "RED" ? "#FF0E15" : entry.RoundColor === "GREEN" ? "#2D8956" : entry.RoundColor === "YELLOW" ? "#EAC93B" : "blue"} />
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
                        <div className="ssInnerContainer"  >
                            <div className="ssHeader">Worker Wise Flag Ratio</div>
                            <div className="stackedChatContainer">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart width="100%" height="100%" data={wwfg} >
                                        <Legend verticalAlign='top' iconType="circle" iconSize={10} height={5} align='left' wrapperStyle={{ fontSize: "12px", textAlign: 'justify' }} />
                                        <XAxis textAnchor='start' height={50} tickMargin={0} interval={0} dataKey="WorkerCode" angle="90" scale="auto" minTickGap={0}  >
                                        </XAxis>
                                        <Tooltip />
                                        {/* <YAxis /> */}
                                        <Bar dataKey="RED" stackId="a" fill="#FF0E15" >
                                            <LabelList dataKey="RED" fontSize={25} position="center" content={<CustomLabel />} />
                                        </Bar>
                                        <Bar dataKey="BLUE" stackId="a" fill="blue" >
                                            <LabelList dataKey="BLUE" fontSize={25} position="center" content={<CustomLabel />} />


                                        </Bar>
                                        <Bar dataKey="GREEN" stackId="a" fill="#2D8956" >
                                            <LabelList dataKey="GREEN" position="center" content={<CustomLabel />} />

                                        </Bar>
                                        <Bar dataKey="YELLOW" stackId="a" fill="#EAC93B" >
                                            <LabelList dataKey="YELLOW" position="center" content={<CustomLabel />} />
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
                                        <Legend verticalAlign='top' iconType="circle" iconSize={10} height={5} align='left' wrapperStyle={{ fontSize: "12px", textAlign: 'justify' }} />
                                        <Tooltip />
                                        <XAxis textAnchor='start' height={50} tickMargin={0} interval={0} dataKey="MachineCode" angle="90" scale="auto" minTickGap={0} />
                                        {/* <YAxis /> */}
                                        <Legend wrapperStyle={{ top: 0 }} />
                                        <Bar dataKey="RED" stackId="a" fill="#FF0E15" >
                                            <LabelList dataKey="RED" position="center" content={<CustomLabel />} />
                                        </Bar>
                                        <Bar dataKey="GREEN" stackId="a" fill="#2D8956">
                                            <LabelList dataKey="GREEN" position="center" content={<CustomLabel />} />
                                        </Bar>
                                        <Bar dataKey="BLUE" stackId="a" fill="blue" >
                                            <LabelList dataKey="BLUE" position="center" content={<CustomLabel />} />
                                        </Bar>
                                        <Bar dataKey="YELLOW" stackId="a" fill="#EAC93B" >
                                            <LabelList dataKey="YELLOW" position="center" content={<CustomLabel />} />
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
                                    <BarChart width='100%' height='100%' data={tbaww}>
                                        {/* <CartesianGrid strokeDasharray="3 3" /> */}
                                        <XAxis dataKey="WorkerCode" height={60} angle="90" textAnchor='start' interval={0} />
                                        {/* <YAxis /> */}
                                        <Tooltip />
                                        {/* <Legend /> */}
                                        <Bar dataKey="TodayDHU" fill="#8884d8" markerHeight="40%" >
                                            <LabelList dataKey='DhuPercent' fontSize={20} position='top' />
                                            {
                                                tbaww.map((item, index) => (
                                                    <Cell key={index} fill={color(index, tbaww.length)} />
                                                ))
                                            }
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                    <div className="sFiveContainer">
                        <div className="sfourInner"  >
                            <div className="sfourHeader">Operations Wise Fault Ratio</div>
                            <div className="sfoutChartContainer" style={{ overflowX: 'scroll', overflowY: 'hidden' }}>
                                <ResponsiveContainer width='200%' height='100%'>
                                    <BarChart width='100%' height='100%' data={OprationWiseFaultRatio} >
                                        {/* <CartesianGrid strokeDasharray="3 3" /> */}
                                        <Legend verticalAlign='top' iconType="circle" iconSize={10} height={5} align='left' wrapperStyle={{ fontSize: "12px", textAlign: 'justify' }} />
                                        <XAxis dataKey="OperationDescription" tick={{ fontSize: 12 }} textAnchor='start' height={50} tickMargin={0} interval={0} angle="90" scale="auto" minTickGap={0} />
                                        {/* <YAxis /> */}
                                        <Tooltip />
                                        {/* <Legend /> */}
                                        <Bar dataKey="CheckedPcs" fill="#2D8956" barSize={20} >
                                            <LabelList dataKey='CheckedPcs' fontSize={25} position='top' />
                                        </Bar>
                                        <Bar dataKey="DefectedPcs" fill="#FF0E15" barSize={20} >
                                            <LabelList dataKey='DefectedPcs' fontSize={25} position='top' />
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