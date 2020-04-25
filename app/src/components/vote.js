import React, { useEffect } from 'react'
import {connect} from 'react-redux';
import {vote} from '../redux/actions/meeting';
import voteIcon from '../assets/vote.svg';

const VoteButton = (props) => {
    const {vote, token, meetingId, voteCount} = props

    useEffect(() => {
        
    },[voteCount])

    const handleVote = () => {
        vote(meetingId, token)
    }
    return(
        <>
            <img alt="" className="icon vote" src={voteIcon} onClick={handleVote}/>
            <span>{voteCount}</span>
        </>
    )
}
const mapStateToProps = state => ({
    token: state.user.token
})
const mapDispatchToProps = dispatch => ({
    vote: (meetingId, token) => dispatch(vote(meetingId, token))
})

export default connect(mapStateToProps, mapDispatchToProps)(VoteButton);