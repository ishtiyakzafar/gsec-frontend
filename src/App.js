import {useState} from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store.js';
import CardDetails from './Components/CardDetails/CardDetails.js';
import HomePage from './Components/HomePage/HomePage.js';
import { IPO, NCD, SGB } from './helpers/constants.js';
import IPOApplyForm from './Components/IPOApplyForm/IPOApplyForm.js';
import SGBApplyForm from './Components/SGBApplyForm/SGBApplyForm.js';
import NCDApplyForm from './Components/NCDApplyForm/NCDApplyForm.js';
import ViewStatus from './Components/ViewStatus/ViewStatus.js';
import ApplyInOtherCategory from './Components/ApplyInOtherCategory/ApplyInOtherCategory.js';
import LandingPage from './Components/LandingPage/LandingPage.js';
import MainWrapper from './Components/MainWrapper/MainWrapper.js';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import IPODetails from './Components/IPODetails/IPODetails.js';
import NCDDetails from './Components/NCDDetails/Ncd_details.js';
import NCDapplication1 from './Components/NCDDetails/Ncdapplication1.js';
import NCDapplication2 from './Components/NCDDetails/Ncdapplication2.js';
import NCDapplication3 from './Components/NCDDetails/Ncdapplication3.js';
import NCDapplication4 from './Components/NCDDetails/Ncdapplication4.js';
import YourApplication from './Components/YourApplications/index.js';
import ApplicationProcess from './Components/ApplicationProcess/index.js';
import ApplicationModifyProcess from './Components/ApplicationModifyProcess/index.js'; 
import SGBDetailsPage from './Components/SGBBonds/SGBDetailsPage.js';
import SGBApplicationPage1 from './Components/SGBBonds/SGBApplicationPage1.js';
import SGBApplicationPage3 from './Components/SGBBonds/SGBApplicationPage3.js';
import ProtectedRoute from "./services/ProtectedRoute";
import GsecDetails from './Components/GsecDetails/AllScreen/DetailsScreen.js';
import GsecWeb from './Components/GsecDetails/GsecWeb/GsecWeb.js';
import useWindowDimensions from './hooks/screenWidth.js';

function App() {
	const { width } = useWindowDimensions();
	const [selectedRange,setSelectedRange] = useState(0)
	const [sgbtranscode,setSgbTranscode] = useState('SGBTRANSCODE')
	const [customrange,setCustomRange]= useState(200000)
	const [disableranger, setDisableRanger] = useState(false)

	const handleRange = (price) =>{
		setSelectedRange(price)
	}
	const handleSgbTransc = (tcode) =>{
		setSgbTranscode(tcode)
	}

	const handleCustRange = (value)=>{
		setCustomRange(value)
	}
	const handleDisRange = (value) =>{
		setDisableRanger(value)
	}

	return (
		<Provider store={store}>
			<Router>
				<Switch>
					
					<Route exact path="/">
						<MainWrapper ChildElement={LandingPage} />
					</Route>
					<ProtectedRoute exact path="/your_applications" Component={MainWrapper} gradient={false} ChildElement={YourApplication} />
					<ProtectedRoute exact path="/application_process" Component={ApplicationProcess} />
					
					
					<Route exact path="/ipo_details/:issueCode">
						<MainWrapper gradientSmall={true} ChildElement={IPODetails} />
					</Route>
					<Route exact path="/ncd_details/:issueCode">
						<MainWrapper gradientSmall={true} ChildElement={NCDDetails} />
					</Route>

					<ProtectedRoute exact path="/ncd-application-step-1/" Component={NCDapplication1} />
					<ProtectedRoute exact path="/ncd-application-step-2/" Component={NCDapplication2} />
					<ProtectedRoute exact path="/ncd-application-step-3/" Component={NCDapplication3} />
					<ProtectedRoute exact path="/ncd-application-step-4/" Component={NCDapplication4} />
					<ProtectedRoute exact path="/ipo_modify/:issueCode/:applicationno" Component={ApplicationModifyProcess} />

					{/* <Route exact path="/ipo_card_details">
						<CardDetails type={IPO} />
					</Route> */}
					
					<Route exact path="/sovereign_gold_bond_details">
						{/* <CardDetails type={SGB} /> */}
						<SGBDetailsPage 
							selectedRange={selectedRange}
							customrange={customrange}
							disableranger={disableranger}
							handleRange={handleRange}
							handleCustRange={handleCustRange}
							handleDisRange={handleDisRange}
						/>
					</Route>
					<ProtectedRoute exact path="/sgb_apply" Component={SGBApplicationPage1} 
						selectedRange={selectedRange}
						customrange={customrange}
						disableranger={disableranger}
						handleSgbTransc={handleSgbTransc}
						handleRange={handleRange}
						handleCustRange={handleCustRange}
						handleDisRange={handleDisRange}
					/>
					<ProtectedRoute exact path="/sgb_application_finish" Component={SGBApplicationPage3} 
						selectedRange={selectedRange}
						sgbtranscode={sgbtranscode}
					/>
					

					<Route exact path="/home_finance_bond_card_details">
						<CardDetails type={NCD} />
					</Route>
					<Route exact path="/ipo_apply">
						<IPOApplyForm />
					</Route>
					<Route exact path="/sgb_apply">
						<SGBApplyForm />
					</Route>
					<Route exact path="/ncd_apply">
						<NCDApplyForm />
					</Route>
					<Route exact path="/view_status">
						<ViewStatus />
					</Route>
					<Route exact path="/apply_in_other_category">
						<ApplyInOtherCategory />
					</Route>
					<Route exact path="/add-fund-result">
						<>
							<h2>Thank You for Add fund</h2>
						</>
					</Route>

					{/* Gsec landing page  */}
					<ProtectedRoute exact path="/investment-details" Component={MainWrapper} gradient={false} ChildElement={width <768 ? GsecDetails : GsecWeb } />

					{/* 404 page start */}
					<Route path="*">
						<>
							<h1>404 Page not found</h1>
							<a href='/'>Back to One Up</a>
						</>
					</Route>
					{/* 404 page Ends */}
				</Switch>
			</Router>
		</Provider>
	);
}

export default App;
