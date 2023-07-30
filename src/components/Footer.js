import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/Footer.css'
import {
    FormControl,
    InputLabel,
    Input,
    Button,
} from '@material-ui/core';
const Footer = () => {
    return (
        <>
        <footer id="footer" class="footer-1" style={{"margin-top":"20px",padding:"15px 0 15px 0","box-shadow": "0px -3px 1px -2px rgba(0,0,0,0.2), 0px -2px 2px 0px rgba(0,0,0,0.14), 0px -1px 5px 0px rgba(0,0,0,0.12)"}}>
        <div class="main-footer widgets-dark typo-light">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-sm-6 col-md-3">
                        <div class="widget subscribe no-box">
                            <h5 class="widget-title" style={{"margin-bottom": "20px"}}>COMPANY NAME
                            <span style={{"background": "#839FAD none repeat scroll 0 0","display":"block","height":"1.5px","margin-top":"10px","position":"relative","width":"20%"}}></span>
                            <span style={{"background":"#839FAD none repeat scroll 0 0","display":"block",height:"1.5px","margin-top":"5px","width":"50%"}}></span>
                            </h5>
                            <p>E-Learn is an innovative online learning portal that utilizes a robust tech stack to deliver a seamless and engaging learning experience.  </p>
                        </div>
                    </div>

                    <div class="col-xs-12 col-sm-6 col-md-3">
                        <div class="widget no-box">
                            <h5 class="widget-title" style={{"margin-bottom": "20px"}}>Quick Links
                            <span style={{"background": "#839FAD none repeat scroll 0 0","display":"block","height":"1.5px","margin-top":"10px","position":"relative","width":"20%"}}></span>
                            <span style={{"background":"#839FAD none repeat scroll 0 0","display":"block",height:"1.5px","margin-top":"5px","width":"50%"}}></span>                            </h5>
                            <ul class="thumbnail-widget" style={{"padding-left": 0, "list-style": "none"}}>
                                <li>
                                    <div class="thumb-content"><a href="#.">&nbsp;Get Started</a></div> 
                                </li>
                                <li>
                                    <div class="thumb-content"><a href="#.">&nbsp;Top Leaders</a></div> 
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="col-xs-12 col-sm-6 col-md-3">
                        <div class="widget no-box">
                            <h5 class="widget-title" style={{"margin-bottom": "20px"}}>Follow up
                            <span style={{"background": "#839FAD none repeat scroll 0 0","display":"block","height":"1.5px","margin-top":"10px","position":"relative","width":"20%"}}></span>
                            <span style={{"background":"#839FAD none repeat scroll 0 0","display":"block",height:"1.5px","margin-top":"5px","width":"50%"}}></span>                            </h5>
                            <a href="#"> <i class="fa fa-facebook"> </i> </a>
                            <a href="#"> <i class="fa fa-twitter"> </i> </a>
                            <a href="#"> <i class="fa fa-youtube"> </i> </a>
                        </div>
                    </div>
                    <br/>
                    <br/>

                    <div class="col-xs-12 col-sm-6 col-md-3">
                        <div class="widget no-box">
                            <h5 class="widget-title" style={{"margin-bottom": "20px"}}>Contact Us
                            <span style={{"background":"#839FAD none repeat scroll 0 0","display":"block","height":"1.5px","margin-top":"10px","width":"20%"}}></span>
                            <span style={{"background":"#839FAD none repeat scroll 0 0","display":"block","height":"1.5px","margin-top":"5px","width":"50%"}}></span>                            
                            </h5>
                            <p>Subscribe us for daily updates and news.</p>
                            <div class="emailfield">
                                {/* <input type="text" name="email" placeholder='Email'/> */}
                                    <FormControl className='input-label' style={{width:"75%","padding-bottom":"10px",display:"flex","justify-content":"center","align-items":"center"}} >
                                        <InputLabel>Email</InputLabel>
                                        <Input type="email" name="email" style={{width:"100%"}}/>
                                    </FormControl>  
                                <Button className='navbar-btn' style={{width:"75%"}} type="submit" value="submit"> Subscribe </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
  
            <div class="footer-copyright" style={{"background-color":"#e0e0e0","margin-top":"15px",height:"25px"}}>
                <div class="container" >
                    <div class="row">
                        <div class="col-md-12 text-center" >
                            <p>Copyright Abhinav Verma © 2023. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
        </>
    );
};

export default Footer;