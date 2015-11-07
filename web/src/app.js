
import createBrowserHistory from 'history/lib/createBrowserHistory';

var Link = ReactRouter.Link;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var Router = ReactRouter.Router;
var redirect = (to) => history.pushState(null, null, to);

const App = React.createClass({
    render() {
        return (
            <div className="main container">
                <SearchWidget/>

                {this.props.children}
            </div>
        )
    }
});


const Answers = React.createClass({
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
});


const AnswersList = React.createClass({
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
});

const CreateAnswer = React.createClass({
    contextTypes: {
        history: React.PropTypes.object.isRequired
    },

    render() {
        console.log(this.context);

       return (
           <div>
               <h1>Create new answer</h1>

               <div className="col-sm-12">
                   <form className="form-horizontal">
                       <div className="form-group">
                           <div>Title</div>
                           <input type="text" className="form-control" ref="title"/>
                       </div>

                       <div className="form-group">
                           <div>Content</div>
                           <input type="text" className="form-control" ref="content"/>
                       </div>

                       <div className="row">
                            <button type="button" onClick={this.handleSubmit} className="pull-right btn btn-primary">Create</button>
                       </div>
                   </form>
               </div>
           </div>
       )
   },

   handleSubmit() {
       $.post('api/answers', {
           title: this.refs.title.value,
           content: this.refs.content.value
       })
       .success((response) => {
           this.context.history.pushState(null, 'answers/' + response.answer.id)
       });
   }
});

const ShowAnswer = React.createClass({

    getInitialState() {
        return {
            answer: {}
        }
    },

    componentDidMount() {
        $.getJSON('api/answers/' + this.props.params.id, (response) => {
            this.setState({answer: response.answer})
        })
    },

    render() {
        return (
            <div>
                <h1>{this.state.answer.title}</h1>
            </div>
        )
    }
});


const SearchWidget = React.createClass({
    render() {
        return (
            <div className="search-widget">
                <div className="input-group input-group-lg">
                    <input type="text" className="orange form-control" />
                    <span className="input-group-btn">
                        <button className="btn orange btn-default" type="button">Go!</button>
                    </span>
                </div>

                <div className="text-right">
                    <Link to={`/answers/?show_all=1`}>Show all</Link>
                    <Link to={`/answers/new`}>Create new</Link>
                </div>
            </div>
        )
    }
});

const NoMatch = React.createClass({
    render() {
        return (
            <div>
                Page not found.
            </div>
        )
    }
});

ReactDOM.render((
   <Router history={createBrowserHistory()}>
       <Route path="/" component={App}>
           <Route path="answers" component={Answers}>
                <IndexRoute component={AnswersList} />
                <Route path="new" component={CreateAnswer} />
                <Route path=":id" component={ShowAnswer} />
            </Route>

           <Route path="*" component={NoMatch}/>
       </Route>
   </Router>
), document.getElementById('react-mount-point'));