import React from 'react'
import { Link } from 'react-router-dom';
import {  Card } from 'antd';
import axios from "axios"
import { Spin } from 'antd';
import IMG from "../../assets/images/dashborad.png"

const Dashboard = () => {
    const [load, setLoad] = React.useState(true)
    const [members, setMembers] = React.useState(0)
    const [events, setEvents] = React.useState(0)
    const [projects, setprojects] = React.useState(0)
    const [programs, setprograms] = React.useState(0)

    const url = "https://admin.uiss.patrickmamsery.works"
    React.useEffect(()=>{
        const token = localStorage.getItem('token');
        const fetchData = async()=>{
            await axios.get(`${url}/api/users`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(response=>{
                console.log(response.data.meta)
                setMembers(
                     response.data.meta.total
                )

            });
            await axios.get(`${url}/api/events`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(response=>{
                console.log(response.data.meta)
                setEvents(
                     response.data.meta.total
                )

            })
            await axios.get(`${url}/api/programs`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(response=>{
                console.log(response.data.meta)
                setprograms(
                     response.data.meta.total
                )

            })
            await axios.get(`${url}/api/projects`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(response=>{
                console.log(response.data.meta)
                setprojects(
                     response.data.meta.total
                )
                setLoad(false)
            })
        }
        fetchData();
    },[])
    

  return (
    <>
    <div className="content-wrapper">
  <div className="content-header">
    <div className="container-fluid">
        <Card>
            <div className="row mb-2">
                <div className="col-sm-6">
                <h1 className="m-0">UISS Admin Panel</h1>
                <h7>Welcome to UISS adimin panel</h7>
                </div>
                <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
                </ol>
                </div>
            </div>
        </Card>
    </div>
  </div>
  <section className="content">
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-3 col-6">
          <div className="small-box bg-info">
            <div className="inner">
              <p>Users</p>
              {load ? <Spin/> : 
              <h3>{members}</h3>
              }
            </div>
            <div className="icon">
              <i className="ion ion-bag" />
            </div>
            <Link to="/dashboard/users" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></Link>
          </div>
        </div>
        <div className="col-lg-3 col-6">
          <div className="small-box bg-success">
            <div className="inner">
              <p>Programs</p>
              {load ? <Spin/> : 
              <h3>{programs}</h3>
              }
            </div>
            <div className="icon">
              <i className="ion ion-stats-bars" />
            </div>
            <Link to="/dashboard/programs" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></Link>
          </div>
        </div>
        <div className="col-lg-3 col-6">
          <div className="small-box bg-warning">
            <div className="inner">
              <p>Projects</p>
              {load ? <Spin/> : 
              <h3>{projects}</h3>
              }
            </div>
            <div className="icon">
              <i className="ion ion-person-add" />
            </div>
            <Link to="/dashboard/projects" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></Link>
          </div>
        </div>
        <div className="col-lg-3 col-6">
          <div className="small-box bg-danger">
            <div className="inner">
              <p>Events</p>
             {load ? <Spin/> : 
              <h3>{events}</h3>
              }
            </div>
            <div className="icon">
              <i className="ion ion-pie-graph" />
            </div>
            <Link to="/dashboard/events" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></Link>
          </div>
        </div>
      </div>
        <div style={{textAlign: "center"}}>
            <h2>WELCOME</h2>
        </div>
        <div className='row'>
            <section className="col-lg-12 connectedSortable">
            <div className="card">
                <img src={IMG} alt='pic' style={{position: "relative", padding: "20px"}}/>
            </div>
            </section>
        </div>
    </div>
  </section>
</div>

    </>
  )
}

export default Dashboard