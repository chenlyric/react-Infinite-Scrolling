import React,{Component} from 'react'
import axios from 'axios'
import {groupList} from '../../services/datareport'
import '../../assets/index.scss'
import ReactInfinitScroller from '../../components/scrollDom'
class RealMonitor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchName: '',
            datagroup:[],//数据数组
            hasMoreItems: true
        }
    }
    componentDidMount(){
        let datagroup = [{
            hospitalName: '第一医院',
            extractNum: '234532',
            inventoryNum:'234532',
            mormalFlow:'23',
            failureFlow:'5'
        },{
            hospitalName: '第2医院',
            extractNum: '234532',
            inventoryNum:'234532',
            mormalFlow:'23',
            failureFlow:'5'
        },{
            hospitalName: '第3医院',
            extractNum: '234532',
            inventoryNum:'234532',
            mormalFlow:'23',
            failureFlow:'5'
        },{
            hospitalName: '第4医院',
            extractNum: '234532',
            inventoryNum:'234532',
            mormalFlow:'23',
            failureFlow:'5'
        },{
            hospitalName: '第5医院',
            extractNum: '234532',
            inventoryNum:'234532',
            mormalFlow:'23',
            failureFlow:'5'
        },{
            hospitalName: '第6医院',
            extractNum: '234532',
            inventoryNum:'234532',
            mormalFlow:'23',
            failureFlow:'5'
        },{
            hospitalName: '第7医院',
            extractNum: '234532',
            inventoryNum:'234532',
            mormalFlow:'23',
            failureFlow:'5'
        }]
        this.setState({
            datagroup: datagroup
        })
    }
    nameSearch(e){
        this.setState({
            searchName: e.target.value
        })
     }
    btnsearch=()=>{
        console.log('查询')
    }
    gotoService=()=>{
        this.props.history.push({
            pathname: '/servicelist',
            query: { id: '12' },
            state: { fromDashboard: true },
            params: {
                'userId': 1
            }
        })
    }
    getGroupList(pageNum){
        var thiz =this
        var start = (pageNum-1)*16
        var param={
            dataTotal: true,
            limit: 16,
            // orderdir: asc,
            start: start
        }
        groupList(param,response => {
            if(response && response.data && response.data.returnCode ==='0'){
                if (pageNum > Math.ceil(response.data.total/16)) {
                    this.setState({ hasMoreItems: false })
                    return;
                }
                thiz.setState({
                    datagroup: thiz.state.datagroup.concat(response.data.data),
                    pageNum: Math.ceil(response.data.total/16)
                },()=>{
                    thiz.initsetIntervalData();
                })
            }
        },errResponse=>{
            setTimeout(function () {
                let datagroup = [{
                    hospitalName: '第一医院',
                    extractNum: '234532',
                    inventoryNum:'234532',
                    mormalFlow:'23',
                    failureFlow:'5'
                },{
                    hospitalName: '第2医院',
                    extractNum: '234532',
                    inventoryNum:'234532',
                    mormalFlow:'23',
                    failureFlow:'5'
                },{
                    hospitalName: '第3医院',
                    extractNum: '234532',
                    inventoryNum:'234532',
                    mormalFlow:'23',
                    failureFlow:'5'
                },{
                    hospitalName: '第4医院',
                    extractNum: '234532',
                    inventoryNum:'234532',
                    mormalFlow:'23',
                    failureFlow:'5'
                },{
                    hospitalName: '第5医院',
                    extractNum: '234532',
                    inventoryNum:'234532',
                    mormalFlow:'23',
                    failureFlow:'5'
                },{
                    hospitalName: '第6医院',
                    extractNum: '234532',
                    inventoryNum:'234532',
                    mormalFlow:'23',
                    failureFlow:'5'
                },{
                    hospitalName: '第7医院',
                    extractNum: '234532',
                    inventoryNum:'234532',
                    mormalFlow:'23',
                    failureFlow:'5'
                }]
                thiz.setState({
                    datagroup: thiz.state.datagroup.concat(datagroup)
                })
            },100)
        })
    }
    render() {
        var creatDivDom =  this.state.datagroup.map((item,index)=>{
            return <div className='list-card' key={index}>
                <h5>{item.hospitalName}</h5>
                <div className='cardrecord'>
                    <div className='wl'>
                        <i className='sqiuer'></i>
                        <span>{item.extractNum}</span>
                    </div>
                    <div className='wr'>
                        <i className='sqiuer'></i>
                        <span>{item.inventoryNum}</span>
                    </div>
                </div>
                <div className='cardrecord'>
                    <div className='wl'>
                        <i className='circle'></i>
                        <span>{item.mormalFlow}</span>
                    </div>
                    <div className='wr failure'>
                        <i className='twinkle circle'></i>
                        <span>{item.failureFlow}</span>
                    </div>
                </div>
            </div>
        })
        return (
            <div className='realmonitor'>
                <div className='crumb-header'>实时监控</div>
                <div className='content-right clearfix'>
                    <div className='toolbar form-inline'>
                        <div className="input-group">
                            <input className="form-control ue-form" type="text"
                                   placeholder='医院名称' value={this.state.searchName} onChange={(e)=>this.nameSearch(e)} />
                            <div className="input-group-addon ue-form-btn" onClick={this.btnsearch}>
                                <span className="fa fa-search"></span>
                            </div>
                        </div>
                        <button type="button" className="btn ue-btn btndetail" onClick={this.gotoService}>详情</button>
                    </div>
                    <div className='legend'>
                        <i className='sqiuer'></i>
                        <span>抽取数量</span>
                        <i className='sqiuer inventory'></i>
                        <span>入库数量</span>
                        <i className='circle'></i>
                        <span>正常流数</span>
                        <i className='circle fail'></i>
                        <span>失败流数</span>
                    </div>
                   <div className='contentbox'>
                       <ReactInfinitScroller
                           pageStart={0}
                           loadMore={(e) => this.getGroupList(e)}
                           hasMore={this.state.hasMoreItems}
                           // loader={loader}
                           useWindow={false}
                           threshold={100}
                       >
                           <div className="">
                               {creatDivDom}
                           </div>
                       </ReactInfinitScroller>
                       {
                           // this.state.datagroup.map((item,index)=>{
                           //     return <div className='list-card' key={index}>
                           //         <h5>{item.hospitalName}</h5>
                           //         <div className='cardrecord'>
                           //             <div className='wl'>
                           //                 <i className='sqiuer'></i>
                           //                 <span>{item.extractNum}</span>
                           //             </div>
                           //             <div className='wr'>
                           //                 <i className='sqiuer'></i>
                           //                 <span>{item.inventoryNum}</span>
                           //             </div>
                           //         </div>
                           //         <div className='cardrecord'>
                           //             <div className='wl'>
                           //                 <i className='circle'></i>
                           //                 <span>{item.mormalFlow}</span>
                           //             </div>
                           //             <div className='wr failure'>
                           //                 <i className='twinkle circle'></i>
                           //                 <span>{item.failureFlow}</span>
                           //             </div>
                           //         </div>
                           //     </div>
                           // })
                       }
                   </div>
                </div>
            </div>
        );
    }
}
export default RealMonitor