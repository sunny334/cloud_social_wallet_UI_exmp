import {useState} from 'react';
import './App.css'
import { Card, Header, SendBalance } from './components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GetBalance from './components/GetBalance';

function App() {
    const [visibility, setVisibility] = useState('main')

    return (<div className="contianer">
        <Card className={visibility == 'main' ? "card" : ""}>
            {visibility == 'send' ?
                <SendBalance/> : visibility == 'query' ?
                <GetBalance setVisibility={setVisibility}/> :
                <Header setVisibility={setVisibility}/>
            }
        </Card>
        <ToastContainer/>
    </div>)
}
export default App
