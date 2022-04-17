import React, { Component } from 'react'
import * as ReactDOMClient from 'react-dom/client'

class App extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <div>this is a react app</div>
    }
}

const container = document.getElementById('app')
const root = ReactDOMClient.createRoot(container)
root.render(<App />)
// ReactDOM.render(<App />, document.getElementById('app'))
