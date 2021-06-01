import React, {Component} from 'react'
import './css/receipt.css'
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

var total =0;
var price;
class Receipt extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            Cart:JSON.parse(localStorage.getItem('dataCart')),
            error:null,
            billinginfos:
            {
                "billingId":this.props.location.state.billingId,
                "email":this.props.location.state.email,
                "cardName": this.props.location.state.cardName,
                "cardNo":this.props.location.state.cardNo,
                "billDate":this.props.location.state.billDate
            },
            response:{},
            orders:[], 
        }
    }
    
    componentDidMount(){
        axios.get('https://localhost:44374/api/Order/' ).then(response => response.data).then(
            (result)=>{
                this.setState({
                    orders:result
                });
            },
            (error)=>{
                this.setState({error});
            }
        )
    }

   generatePDF(){
        html2canvas(document.getElementById('capture')).then(function(canvas){
         var imgdata = canvas.toDataURL('image/png')
        var doc = new jsPDF('p','px','a4')

        
        var pageWidth = doc.internal.pageSize.getWidth();
        var pageHeight = doc.internal.pageSize.getHeight();

        var widthRatio = pageWidth/canvas.width;
        var heightRatio = pageHeight/canvas.height;
        var ratio = widthRatio > heightRatio ? heightRatio : widthRatio;

        var canvasWidth = canvas.width*ratio;
        var canvasHeight = canvas.height*ratio;
        
        var marginX = (pageWidth-canvasWidth)/2;
        var marginY = (pageHeight-canvasHeight)/2;

        doc.addImage(imgdata,'PNG', marginX,marginY, canvasWidth, canvasHeight)
        doc.save("Govimithuro Receipt.pdf")
        }) 
   }

  
  
    

    render(){
        const{billinginfos,Cart,error}=this.state;
        
        if(error){
            return(
                <div className="center"><h4>Error : {error.message}!!!</h4></div>
            )
        }
        else{ 
            return(
                <div className="container">
                    <div className="Rec-box">
                        <p className="center" >Thank you for your purchase!</p>
                        <p className="center">A Confirmation Email is sent to {billinginfos.email} </p>
                        
                        <div id = "capture" className="Order-sum">
                            <h4 className="center">Order Summary</h4>
                    
                            <div className="mid">
                                <div className="info">
                                
                                    <p>
                                        Card Holder's name &ensp;:&ensp;{billinginfos.cardName}                                   
                                    </p>
                                    <p>                                   
                                        Card Number&emsp;&emsp;&emsp;&ensp;:&ensp;{billinginfos.cardNo}                               
                                    </p>
                                    <p>
                                        Bill Date&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;&nbsp;:&ensp;{billinginfos.billDate}
                                    </p>

                                
                                </div>
                            </div>

                            <div id="bot">
                                <div id="table">
                                    <table>
                                        <thead>
                                            <tr className="tabletitle">
                                                <td> <h6>Item</h6></td>
                                                <td><h6>Quantity</h6> </td>
                                                <td><h6>Price(Rs)</h6></td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Cart.map(order =>
                                            <tr className="service" key={order.productId}>
                                                <td className="tableitem">
                                                    <span className="itemtext">{order.productName}</span>
                                                </td>
                                                <td className="tableitem">
                                                    <span className="itemtext">{order.quantity}</span>
                                                </td>
                                                <td className="tableitem">
                                                    <span className="itemtext">{price=order.quantity*order.unitPrice}</span>
                                                    <span hidden>{total=total+price}</span>
                                                </td>
                                            </tr>
                                             )}

                                            <tr className="service">
                                                <td className="tableitem">
                                                    <span className="itemtext">Courier Service</span>
                                                </td>
                                                <td className="tableitem">
                                                    <span className="itemtext"></span>
                                                </td>
                                                <td className="tableitem">
                                                    <span className="itemtext">300</span>
                                                    <span hidden>{total=total+300}</span>
                                                </td>
                                            </tr>

                                            <tr className="service">
                                            <td className="tableitem">
                                                <span className="itemtext"></span>
                                            </td>
                                            <td className="tableitem">
                                                <span className="itemtext"><strong>TOTAL</strong></span>
                                            </td>
                                            <td className="tableitem">
                                                <span className="itemtext"><strong>{total}</strong></span>
                                                <span hidden>{total =0}</span>
                                            </td>
                                            </tr>

                                        </tbody>
                                    
                                        </table>
                                </div>
                            </div>
                        </div>
                        <button onClick={this.generatePDF} >Download PDF</button>
                </div>
            </div>                
            )
        }
        
    }

}


export default Receipt