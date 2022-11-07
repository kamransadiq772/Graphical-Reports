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

    const faultyOperations = topFaultyOperations
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


    return (
        <div className='container'>
            <div className="upperContainer">
            <div className="upperContainerInner">Endline {line} Section {section}</div>
            </div>
            <div className="bottomContainer">
                <div className="bottomInner">
                    <div className="thirdgraph firstGraph">
                        <div className="boxInner">
                            <div className="boxHeader">Total Defected Pieces Ratio</div>
                            <div className="boxBottom">
                                <ResponsiveContainer width='100%' height='100%' >
                                    <PieChart width='100%' height='100%'>
                                        <Legend
                                            layout='vertical'
                                            align='right'
                                            iconType="circle"
                                            iconSize={10}
                                            verticalAlign='middle'
                                        />
                                        <Pie data={dr} fontSize={25} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius="80%" label >
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
                                    <BarChart width='100%' height='100%' data={faultyOperations} >
                                        {/* <CartesianGrid strokeDasharray="3 3" /> */}
                                        <XAxis dataKey="OperationDescription" axisLine={false} tickLine={false} />
                                        {/* <YAxis /> */}
                                        <Tooltip />
                                        {/* <Legend /> */}
                                        <Bar dataKey="TotalFaults" >
                                            <LabelList dataKey='TotalFaults' fontSize={25} position='insideTop' fill='black' />
                                            {
                                                faultyOperations.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={color(index, faultyOperations.length)} strokeWidth={0} />
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
                                    <BarChart width='100%' height='100%' data={fw} >
                                        {/* <CartesianGrid strokeDasharray="3 3" /> */}
                                        <XAxis dataKey="FaultDescription" axisLine={false} tickLine={false} >
                                            <Label offset={0} position="insideBottom" />
                                        </XAxis>
                                        {/* <YAxis /> */}
                                        <Tooltip />
                                        {/* <Legend /> */}
                                        <Bar dataKey="FaultPercentage"
                                        >
                                            <LabelList dataKey='fp' fontSize={25} position='top' fill='black' />

                                            {
                                                fw.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={color(index, fw.length)} />
                                                ))
                                            }
                                        </Bar>
                                        {/* <Brush height={30} /> */}
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
