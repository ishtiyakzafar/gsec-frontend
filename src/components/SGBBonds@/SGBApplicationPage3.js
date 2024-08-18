import React from 'react'
import {Link} from 'react-router-dom'
import './SGBApplication3.css'
import SGB48 from '../../assets/images/Sgb/Soverign Gold Bonds_48 Px.webp'
import G15651 from '../../assets/images/Sgb/Group 15651.svg'
const SGBApplicationPage3 = ({selectedRange,sgbtranscode}) => {
    
    return (
        <>
        <section id="sgb-ap3-header">
      <div class="sgb-ap3-header-left">
      <Link to="/sovereign_gold_bond_details"><img src={SGB48} alt='' /></Link>
        <div>
          <h1>Sovereign Gold Bonds</h1>
          <div class="header-heading-subtext">
            <p>Scheme 2021-22 Series - VI</p>
            <p>·</p>
            <p>34 Days: 21 h: 34 m: 43s left to invest</p>
          </div>
        </div>
      </div>
      <div class="sgb-ap3-header-right">
        <div class="steps">
          <p>1</p>
          <hr />
          <p>2</p>
          <hr />
          <p>3</p>
        </div>
        <div class="step-names">
          <p>Review Bids</p>
          <p>Payment</p>
          <p>Apply</p>
        </div>
      </div>
    </section>
    <section id="sgb-ap3-container">
      <img src={G15651} alt="" />
      <h1>We are processing your applications</h1>
      <div class="subtext">
        <p><span>Amount to be blocked: </span> ₹{Number(selectedRange).toLocaleString()}</p>
        <p><span>·</span></p>
        <p><span>Application Number: </span>{sgbtranscode}</p>
      </div>
      <div class="sgb-ap3-next-steps">
        <h2>Your Next Steps?</h2>
        <ul>
          <li>
            <span>1</span>The amount will be blocked in your account.
          </li>
          <li><span>2</span>Your application will be sent to the exchange shortly.</li>
          <li>
            <span>3</span>On successful application the amount will be debited from your account.
          </li>
          <li>
            <span>4</span>This process may take upto 2 hours. If you placed the order after market hours, the application will be processed on the next business day.
          </li>
        </ul>
      </div>
    </section>
    <footer id="sgb-ap3-footer">
      <Link class="view" to="/your_applications">View Application Status</Link>
    </footer>
        </>
    )
}

export default SGBApplicationPage3
