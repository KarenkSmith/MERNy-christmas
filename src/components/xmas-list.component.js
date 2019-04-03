import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Gift = props => (
    <tr>
        <td>{props.gift.gift_description}</td>
        <td>{props.gift.gift_for}</td>
        <td>{props.gift.gift_priority}</td>
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
        axios.get('http://localhost:4000/gifts')
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
                <h3>Xmas List</h3>
                <table className='table table-striped' style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>description</th>
                            <th>responsible</th>
                            <th>priority</th>
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