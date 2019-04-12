import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Sound from 'react-sound';

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
            // user_id: null,

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
            gift_completed: this.state.gift_completed,
            // user_id: this.state.user
        }

        axios.post('/gifts/add', newGift)
            .then(res => console.log(res.data));

        this.setState ({
            gift_description: " ",
            gift_for: " ",
            gift_priority: " ",
            gift_completed: false 
        })
        this.props.history.push('/list');

    }

    playSound =()=>{
        this.setState ({
            playStatus: true,
        })
    }

    render() {
        return (
         
            

            <div style={{marginTop: 20}}>
                <marquee><h3> <span> 🎁</span> Add new gift <span>💨</span></h3></marquee>
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
                                    checked={this.state.gift_priority==='low'}
                                    onChange={this.onChangeGiftPriority}
                                    />
                            <label className='form-check-label'>low</label>
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
                            <label className='form-check-label'>medium</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                    type="radio"
                                    name="priorityOptions"
                                    id="priorityHigh"
                                    value="high"
                                    checked={this.state.gift_priority==='high'}
                                    onChange={this.onChangeGiftPriority}
                                    />
                            <label className='form-check-label'>high</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit"  onClick={this.playSound} value="add gift" className="btn btn-primary" />
                    </div>
                    <Sound
                    url="https://www.shockwave-sound.com/sound-effects/christmas-sounds/jnglbell.wav"
                    playStatus={Sound.status.PLAYING} 
                />
                </form>
               
            </div>
        )
    }
}