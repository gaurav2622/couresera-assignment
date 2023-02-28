import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, Media } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Stagger, Fade } from 'react-animation-components'
import { baseUrl } from '../shared/baseUrl'

function About(props) {

    const RenderLeader = (props) => {
        const leader = props.leader
        return (
            <Media className = 'col-12 mb-4'>
                <Media left className ='col-2'>
                    <img src = {baseUrl + leader.image}/>
                </Media>
                <Media body >
                    <Media heading>{leader.name}</Media>
                    <p>{leader.designation}
                    </p>
                    <p>
                        {leader.description}
                    </p>
                </Media>
            </Media>
        )
    }

    const leaders = props.leaders.leaders.map((leader) => {
        return (
            <Fade in>
                <RenderLeader leader = {leader} key = {leader.id}/>
            </Fade>
        );
    });

    return(

        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>About Us</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>About Us</h3>
                    <hr />
                </div>                
            </div>
            <div className="row row-content">
                <div className="col-12 col-md-6">
                    <h2>Our History</h2>
                    <p>Our History</p>
                    <p>Our Hotel History</p>
                </div>
                <div className="col-12 col-md-5">
                    <Card>
                        <CardHeader className="bg-primary text-white">Facts At a Glance</CardHeader>
                        <CardBody>
                            <dl className="row p-1">
                                <dt className="col-6">Started</dt>
                                <dd className="col-6">20 march</dd>
                                <dt className="col-6">XYZ</dt>
                                <dd className="col-6">Capgemini</dd>
                                <dt className="col-6">Total</dt>
                                <dd className="col-6">$1500000</dd>
                                <dt className="col-6">Employees</dt>
                                <dd className="col-6">120</dd>
                            </dl>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-12">
                    <Card>
                        <CardBody className="bg-faded">
                            <blockquote className="blockquote">
                                <p className="mb-0">Lorum ipsum dolor sit amit.</p>
                                <footer className="blockquote-footer">John Doe,
                                <cite title="Source Title">Lorum ipsum dolor sit amit.</cite>
                                </footer>
                            </blockquote>
                        </CardBody>
                    </Card>
                </div>
            </div>
            <div className="row row-content">
                <div className="col-12">
                    <h2>Corporate Leadership</h2>
                </div>
                <div className="col-12">
                    <Media list className = 'pl-0 mt-2'>
                        <Stagger in duration={300}>
                            {leaders}
                        </Stagger>
                    </Media>
                </div>
            </div>
        </div>
    );
}

export default About;    