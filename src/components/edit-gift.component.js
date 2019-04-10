import React, {Component} from 'react';
import axios from 'axios';


export default class EditGift extends Component {

    constructor(props) {
        super(props);

        this.onChangeGiftDescription = this.onChangeGiftDescription.bind(this);
        this.onChangeGiftFor = this.onChangeGiftFor.bind(this);
        this.onChangeGiftPriority = this.onChangeGiftPriority.bind(this);
        this.onChangeGiftCompleted = this.onChangeGiftCompleted.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            gift_description: '',
            gift_for: '',
            gift_priority: '',
            gift_completed: false
        }
    }

    componentDidMount() {
        axios.get('/gifts/'+this.props.match.params.id)
        .then(response => {
            this.setState({
                gift_description: response.data.gift_description, 
                gift_for: response.data.gift_for, 
                gift_priority: response.data.gift_priority, 
                gift_completed: response.data.gift_completed
            })
        })
        .catch(function(error){
            console.log(error)
        })
    }

    onChangeGiftDescription(e){
        this.setState({
            gift_description: e.target.value
        });
    }

    onChangeGiftFor(e){
        this.setState({
            gift_for: e.target.value
        });
    }

    onChangeGiftPriority(e) {
        this.setState({
            gift_priority: e.target.value
        });
    }

    onChangeGiftCompleted(e) {
        this.setState({
            gift_completed: !this.state.gift_completed
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const object = {
            gift_description: this.state.gift_description,
            gift_for: this.state.gift_for,
            gift_priority: this.state.gift_priority,
            gift_completed: this.state.gift_completed,
            // user_id: this.props.user._id
        };
        // this.setState({
        //     gift_description: e.target.value,
        //     gift_for: e.target.value,
        //     gift_priority: e.target.value,
        //     gift_completed: e.target.value
        // })
        axios.post('/gifts/update/'+this.props.match.params.id, object)
            .then(res => res.data);

        this.props.history.push('/list');
    }


    render() {
        return (
            <div>
                <h3> update gift </h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>description: </label>
                        <input type="text"
                                className="form-control"
                                value={this.state.gift_description}
                                    onChange={this.onChangeGiftDescription}
                                    />
                    </div>
                    <div className="form-group">
                        <label>gift for: </label>
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
                        <div className="form-check">
                            <input  type="checkbox"
                                    className="form-check-input"
                                    id="completedCheckbox"
                                    name="completedCheckbox"
                                    onChange={this.onChangeGiftCompleted}
                                    checked={this.state.gift_completed}
                                    value={this.state.gift_completed}
                            />
                            <label className="form-check-label" htmlFor="completedCheckbox">
                                completed
                            </label>
                        </div>
                        <br/>
                        <div className="form-group">
                            <input type="submit" value="update gift" className="btn btn-primary" />
                        </div>
                    </div>

                </form>
            </div>
        )
    }
}