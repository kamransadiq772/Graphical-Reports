import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import color from '../helper/color'
import './fitst.css'
import { ResponsiveContainer, Label, Cell, PieChart, Pie, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, LabelList, Brush } from 'recharts'

const FirstPage = ({ dhu, topFaultyOperations, defectedRatio, faultWise, params, line, section }) => {

    const data = [
        { uv: 1, pv: 49 },
        { uv: 2, pv: 18 },
        { uv: 3, pv: 1 }
    ]

    const faultyOperations = topFaultyOperations.map((item, index) => {
        return {
            TotalFaults: item.TotalFaults,
            OperationDescription: item.OperationDescription.slice(0, 15)+"..."
        }
    })
    const dr = Object.keys(defectedRatio[0]).map((item, index) => {
        return { name: item, value: defectedRatio[0][item] }
    })

    const fw = faultWise.map((item, index) => {
        return { FaultDescription: item.FaultDescription.slice(0, 15), FaultPercentage: item.FaultPercentage, fp: `${Math.round(item.FaultPercentage)}%` }
    })

    // console.log(fw);

    useEffect(() => {
        // const location = new URLSearchParams(window.locaion.search);
        // console.log(location.get('line'));
        // console.log(location.get('sectionid'))
    }, [])

    const renderLegend = (props) => {
        const { payload } = props;
        // console.log("prop@@", payload);
        return (
            <ul>
                {
                    payload.map((entry, index) => (
                        <li key={`item-${index}`} style={{color:entry.color, fontSize:'14px', fontWeight:'600', marginRight:'10px'}} >{entry.payload.name}</li>
                    ))
                }
            </ul>
        );
    };

    return (
        <div className='container'>
            <div className="upperContainer">
                <div className="upperContainerInner"><b>Endline:</b> {line} &emsp; <b>Section:</b> {section}</div>
            </div>
            <div className="bottomContainer">
                <div className="bottomInner">
                    <div className="thirdgraph firstGraph">
                        <div className="boxInner">
                            <div className="boxHeader">Total Defected Pieces Ratio</div>
                            <div className="boxBottom">
                                <ResponsiveContainer width='100%' height='100%' >
                                    <PieChart width='100%' height='100%'
                                    margin={{
                                        top: 22,
                                        right: 0,
                                        left: 0,
                                        bottom: 5
                                      }}
                                    >
                                        <Legend
                                            layout='vertical'
                                            align='right'
                                            iconType="circle"
                                            iconSize={8}
                                            verticalAlign='middle'
                                            fontSize={12}
                                            margin={{ top: 0, left: 10, right: 10, bottom: 0 }}
                                            content={renderLegend}
                                        />
                                        <Pie data={dr} fontSize={18} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius="80%" label >
                                            {
                                                dr.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={color(index, dr.length, 200)} strokeWidth={0} />
                                                ))
                                            }
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                    <div className="secondGraph">
                        <div className="boxInner">
                            <div className="boxHeader">Top Faulty Opertaions</div>
                            <div className="boxBottom">
                                <ResponsiveContainer width='100%' height='100%'>
                                    <BarChart 
                                    width='100%' 
                                    height='100%' 
                                    data={faultyOperations} 
                                    margin={{
                                        top: 22,
                                        right: 0,
                                        left: 0,
                                        bottom: 5
                                      }}
                                    >
                                        {/* <CartesianGrid strokeDasharray="3 3" /> */}
                                        <XAxis dataKey="OperationDescription" axisLine={false} tickLine={false} />
                                        {/* <YAxis /> */}
                                        <Tooltip />
                                        {/* <Legend /> */}
                                        <Bar dataKey="TotalFaults" >
                                            <LabelList dataKey='TotalFaults' fontSize={22} position='top'  />
                                            {
                                                faultyOperations.map((entry, index) => (
                                                    <Cell  key={index} fill={color(index, faultyOperations.length)} />
                                                ))
                                            }
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                    <div className="firstGraph" style={{ width: '20%' }}>
                        <div className="boxInner">
                            <div className="boxHeader">EndLine DHU %</div>
                            <div className="boxBottom" style={{ fontSize: '50px', fontWeight: '500' }} >{dhu[0].TodayDHU}%</div>
                        </div>
                    </div>
                    <div className="fourGraph secondGraph" style={{ width: '80%' }}>
                        <div className="boxInner">
                            <div className="boxHeader">Fault Wise Breakdown</div>
                            <div className="boxBottom">
                                <ResponsiveContainer width="100%" height='100%'>
                                    <BarChart 
                                    width='100%' 
                                    height='100%' 
                                    data={fw} 
                                    margin={{
                                        top: 20,
                                        right: 0,
                                        left: 0,
                                        bottom: 5
                                      }}
                                    >
                                        {/* <XAxis dataKey="FaultDescription" axisLine={false} tickLine={false} >
                                            <Label offset={0} position="insideBottom" />
                                        </XAxis> */}
                                        <XAxis dataKey="FaultDescription" height={70} angle="27" textAnchor='start' interval={0} />
                                        <Tooltip />
                                        <Bar dataKey="FaultPercentage"
                                        >
                                            <LabelList dataKey='fp' fontSize={22} position='top'  />
                                            {
                                                fw.map((entry, index) => (
                                                    <Cell key={index} fill={color(index, fw.length)} />
                                                ))
                                            }
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

export default FirstPage
