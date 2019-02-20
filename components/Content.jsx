import React from 'react'
import RemoveButton from './RemoveButton.jsx';
import List from './List.jsx'
import AppActions from '../lib/AppActions';
import AppStore from '../lib/AppStore'


class Content extends React.Component {

    constructor(props) {
        super(props);
        this.state = { articles: [], articlesApproved: [], message: '', hungryText: "Hungry?", hungryButtonColor: "red",
        hungryButtonClicks: 0};
        this.handleClick = this.handleClick.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onRemove = this.onRemove.bind(this);
    }

    handleClick() {
        if (document.getElementById('simpletext').value.length > 0 && this.state.articles.length < 10) {
            AppActions.submitArticle(document.getElementById('simpletext').value)
            document.getElementById('simpletext').value = ''
        }
    }

    componentDidMount() {
        AppStore.addChangeListener('STORE_SUBMIT_ARTICLE', this.onSubmit);
        AppStore.addChangeListener('STORE_REMOVE_ARTICLE', this.onRemove);
    }

    onRemove() {
        this.listArticles()
    }


    onSubmit() {
         this.listArticles()
    }

    listArticles()
    {
        let usermessage = ''

        if (this.state.articles.length > 9) {
            usermessage = 'You have exceeded the number of articles you can submit,You cannot add more articles'
        }

        this.setState({
            articles: AppStore.getAll(),
            articlesApproved: AppStore.getApproved(),
            message: usermessage
        })
    }

    componentWillUnmount() {
        AppStore.removeChangeListener('STORE_SUBMIT_ARTICLE', this.onChange)
         AppStore.removeChangeListener('STORE_REMOVE_ARTICLE', this.onRemove)
    }

    onHungryButtonClicked() {
        let clicks = this.state.hungryButtonClicks;
        clicks++;
        if (clicks % 2 === 0) {
            this.setState({hungryText: "Grab a Snickers!", hungryButtonColor: "brown"});
        }
        else {
            this.setState({hungryText: "We have vegetables at home. :(", hungryButtonColor: "green"});
        }
        this.setState({hungryButtonClicks: clicks});
    }

    render() {
        var simpleContent =
            <div id='top-div'>
                {this.props.text}
                <br />
                <button id='hungry-button' onClick={() => this.onHungryButtonClicked()}
                              style={{backgroundColor: this.state.hungryButtonColor}}>
                    {this.state.hungryText}
                </button>
                Enter text : <input type="text" name="simpletext" id="simpletext" />
                <RemoveButton handleClick={this.handleClick} text="SUBMIT" />
                <br />
                <List articles={this.state.articles} listHeader="Submitted Articles" />
                {this.state.message}
                <List articles={this.state.articlesApproved} listHeader="Approval Status" />
            </div>;

        return simpleContent;
    }

}

export default Content;