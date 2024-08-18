
import { useEffect } from "react"
import Meter_Equal_Distribution_small from "../../../assets/images/Meter_Equal_Distribution_small.png"


const ScoreMeter = (props) => {
    const { type } = props


    useEffect(() => {
        var canvas = document.getElementById("myCanvas");
        var context = canvas.getContext("2d");
        var tempCibilScore = 300;
        var currentCibilScore = document.getElementById('textIn').value;
        var maxValue = 900;
        var minValue = 300;


    function drawTriangle() {

        tempCibilScore += 1;
        var angle = ((tempCibilScore / (900 - 300)) * 180) * (Math.PI / 180) - (Math.PI * 1.5);
        //console.log('sss', tempCibilScore,'angle' ,angle, 'cibl' , tempCibilScore, 'ddd', currentCibilScore);
        document.getElementById('timer').innerHTML = (Math.ceil(tempCibilScore))


        var radius = 114;
        // first move our cursor to the center of our arcs
        context.translate(148, 152);
        // then rotate the whole context
        context.rotate(angle);
        // move our cursor to our arc's radius
        context.translate(radius, 0);
        // draw the triangle

        context.fillStyle = '#000';
        context.beginPath();
        // this draws the triangle around its center point
        context.moveTo(-13, 0);
        context.lineTo(-13, -7);
        context.lineTo(-5, 0);
        context.lineTo(-13, 7);
        // context.lineTo(30, 35);
        // context.lineTo(30, 50);
        // context.moveTo(15, 15);
        context.fill();
        context.closePath();
        context.fill();

        /* draw circle */
        context.beginPath();
        context.arc(14.4, 0, 7, 0, 2 * Math.PI);
        context.lineWidth = 4;
        context.strokeStyle = "#FFF";
        context.stroke();

        // place back our context's transfrom to its default
        context.setTransform(1, 0, 0, 1, 0, 0);
    }
    
    function draw() {
        // clear the canvas
        context.clearRect(0, 0, canvas.width, canvas.height);
        // text
        context.font = "14px Trebuchet MS";
        context.fillStyle = "#000000";
        // since we don't change the properties, no need to tell the browser to do so
        //context.fillText("300", 60, 225);
        //context.fillText("900", 290, 225);


        drawTriangle();
        //  if (tempCibilScore < currentCibilScore) {
        //    requestAnimationFrame(draw);
        //    }
        var drawForMax = tempCibilScore <= maxValue && tempCibilScore < currentCibilScore;
        //var drawForMin = minValue <= tempCibilScore && tempCibilScore > currentCibilScore;
        // //console.log(tempCibilScore, currentCibilScore, drawForMin)
        if (drawForMax) {
            requestAnimationFrame(draw);
        }

    }
    draw();
}, [])


return (
    <>

        <section className="section pt-0">
            <div className="container">
                <div className="row">
                    <div className="col-12" id="ScoreMeter">
                        <div className="score_meter p-4 mb-4 mb-md-0">
                            {/* <!--<img src="assets/images/score_chart.svg" width="100%" alt="chart">--> */}

                            <div className="cibil_scoreBox">
                                <img src={Meter_Equal_Distribution_small} width="297" alt="cibil score" />
                                <canvas id="myCanvas" width="297" height="180" ></canvas>
                                <input type="hidden" value="890" id="textIn" min="300" max="900" />
                                <div className="head">
                                    <h2 id="timer" className="timer count-title count-number invisible" data-to="900" data-speed="1500"></h2>
                                    <h3 className="text-excellent">High</h3>
                                </div>
                            </div>
                        </div>
                        <div className="score_card_main">
                            <div className="analyst_view_main_box mr-0 mr-md-5">
                                <td>Subscribe</td>
                                <table width="100%" className="analyst_view mb-5">
                                    <tr>
                                        <td>Analyst View</td>
                                        <td>1</td>
                                    </tr>
                                    <tr>
                                        <td>Avoid</td>
                                        <td>1</td>
                                    </tr>
                                    <tr>
                                        <td>Neutral</td>
                                        <td>2</td>
                                    </tr>
                                </table>
                                <p className="mb-1 ">Chances of over Subscription &amp; listing gains</p>
                                <div className="score_avrage">High</div>
                            </div>
                            <div className="clearfix"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {/* <!--ScoreMeter close--> */}


    </>
)
}


export default ScoreMeter