import React, { Component } from 'react'
import axios from 'axios'
import './search.css'
class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Posts: [],
    }
    this.cancelToken = ''
    this.onIptClick = this.onIptClick.bind(this)
    this.node = React.createRef()
  }
  componentDidMount() {
    document.addEventListener('mousedown', this.onIptClick)
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.onIptClick)
  }
  onIptClick = (e) => {
    if (this.node.current.contains(e.target)) {
      return
    }
    this.setState({
      Posts: [],
    })
  }
  onLsChange = async (e) => {
    if (this.isReqToken) {
      this.isReqToken.cancel()
    }
    this.isReqToken = axios.CancelToken.source()
    await axios
      .get('/api/products', {
        isReqToken: this.isReqToken.token,
      })
      .then((res) => {
        this.setState({
          Posts: res.data,
        })
      })
      .catch((error) => {
        if (axios.isCancel(error) || error) {
          console.log('Could not get')
        }
      })
    let filterSearch = e.target.value.toLowerCase()
    let searchRes = this.state.Posts.filter((e) => {
      let finalRes = e.name.toLowerCase()
      return finalRes.indexOf(filterSearch) !== -1
    })
    this.setState({
      Posts: searchRes,
    })
  }
  render() {
    return (
      <div className="searchModule">
        <input
        style={{borderRadius:'20px'}}
          onClick={this.onIptClick}
          onChange={this.onLsChange}
          type="text"
          placeholder="Search ..."
          ref={this.node}
        />
        <ul>
          {this.state.Posts.map((res) => {
            return (<div key={res.id}>
            <div className='itm'>{[res.name,<img style={{width:'150px',height:'100px'}} src={res.image}></img>,res.price]}
            </div></div>)})}
        </ul>
      </div>
    )
  }
}
export default Search