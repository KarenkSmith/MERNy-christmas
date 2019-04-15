import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Gift = props => (
    <tr>
        <td className={props.gift.gift_completed ? 'completed' : ''}>{props.gift.gift_description}</td>
        <td className={props.gift.gift_completed ? 'completed' : ''}>{props.gift.gift_for}</td>
        <td className={props.gift.gift_completed ? 'completed' : ''}>{props.gift.gift_priority}</td>
        <td>
            <Link to={"/edit/"+props.gift._id}>edit</Link>
        </td>
    </tr>
)


export default class XmasList extends Component {
    constructor(props){
        super(props);
        this.state = {gifts: []};
    }

    componentDidMount() {
        axios.get('/gifts/')
            .then(response => {
                this.setState({gifts: response.data});
            })
            .catch(function (error){
                console.log('HERE ', error)
            })
      
    }

    componentDidUpdate() {
        axios.get('/gifts/')
        .then(response => {
            this.setState({gifts: response.data});
        })
        .catch(function (error){
            console.log(error)
        })
    }

    giftList() {
        return this.state.gifts.map(function (currentGift, i) {
            return <Gift gift={currentGift} key={i} />
        });
    }

    render() {
        return (
            <div>
                <marquee><h3><span>🦌 </span><span>🦌 </span><span>🦌 </span> Xmas List <span>💨</span></h3></marquee>
                <table className='table table-striped' style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>description</th>
                            <th>for</th>
                            <th>naughty or nice</th>
                            <th>actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.giftList() }
                    </tbody>
                </table>
            </div>
        )
    }
}