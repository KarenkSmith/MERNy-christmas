import React, {Component} from 'react';
import axios from 'axios';

export default class CreateGift extends Component {

    constructor(props) {
        super(props);

        this.onChangeGiftDescription = this.onChangeGiftDescription.bind(this);
        this.onChangeGiftFor = this.onChangeGiftFor.bind(this);
        this.onChangeGiftPriority = this.onChangeGiftPriority.bind(this);
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            gift_description: " ",
            gift_for: " ",
            gift_priority: " ",
            gift_completed: false
        }
    }

    onChangeGiftDescription(e) {
        this.setState ({
            gift_description: e.target.value
        });
    }

    onChangeGiftFor(e) {
        this.setState ({
            gift_for: e.target.value
        });
    }

    onChangeGiftPriority(e) {
        this.setState ({
            gift_priority: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        console.log(`Form submitted:`)
        console.log(`gift description: ${this.state.gift_description}`);
        console.log(`gift for: ${this.state.gift_for}`);
        console.log(`gift priority: ${this.state.gift_priority}`);
        console.log(`gift completed: ${this.state.gift_completed}`);

        const newGift = {
            gift_description: this.state.gift_description,
            gift_for: this.state.gift_for,
            gift_priority: this.state.gift_priority,
            gift_completed: this.state.gift_completed
        }

        axios.post('http://localhost:4000/gifts/add', newGift)
            .then(res => console.log(res.data));

        this.setState ({
            gift_description: " ",
            gift_for: " ",
            gift_priority: " ",
            gift_completed: false
        })
    }

    render() {
        return (
            <div style={{marginTop: 20}}>
                <h3> Add new gift</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label> description:</label>
                        <input type="text"
                                className="form-control"
                                value={this.state.gift_description}
                                onChange={this.onChangeGiftDescription}
                                />
                    </div>
                    <div className="form-group">
                        <label> gift for:</label>
                        <input type="text"
                                className="form-control"
                                value={this.state.gift_for}
                                onChange={this.onChangeGiftFor}
                               />
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                    type="radio"
                                    name="priorityOptions"
                                    id="priorityLow"
                                    value="low"
                                    checked={this.state.gift_priority==='Low'}
                                    onChange={this.onChangeGiftPriority}
                                    />
                            <label className='form-check-label'>Low</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                    type="radio"
                                    name="priorityOptions"
                                    id="priorityMedium"
                                    value="medium"
                                    checked={this.state.gift_priority==='medium'}
                                    onChange={this.onChangeGiftPriority}
                                    />
                            <label className='form-check-label'>Medium</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                    type="radio"
                                    name="priorityOptions"
                                    id="priorityHigh"
                                    value="high"
                                    checked={this.state.gift_priority==='High'}
                                    onChange={this.onChangeGiftPriority}
                                    />
                            <label className='form-check-label'>High</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="add gift" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}