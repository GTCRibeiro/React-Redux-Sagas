import React, { Component } from "react";
import { connect } from "react-redux";
import { FETCH_ARTICLES} from "../constants/action-types";
import { fetchArticles } from "../actions/articles";

const mapDispatchToProps = dispatch => {
    // define as actions a executar quando existirem alterações locais que requerem atualização de state
    return {
        fetchArticles: () => dispatch(fetchArticles()),
    };
};

const mapStateToProps = state => {
    // define as props do componente consoante o state do redux
    return { articles: state.articles };
};

class MasterDetail extends Component{

    constructor(match) {
        super(match);
    }

    componentDidMount()
    {

        if(this.props.articles.length === 0)
        {
            // chamada inicial para ir buscar os artigos
            this.props.fetchArticles();
        }
    }


    render() {


        let article = this.props.articles.find(articlemap => articlemap.id  === parseInt(this.props.match.params.id));
         console.log('article', article);
        if (article)
        {
            return (
                <div>
                    <p>{article.title} </p>
                    <p>{article.name} </p>
                    <p>{article.description} </p>
                    <p>{article.review} </p>
                    <img src={article.image} />
                    <button className="btn btn-danger btn-lg">delete</button>
                </div>
            );
        }
        else
        {
            return (
                <div>
                    <p>Article not found</p>
                </div>
            );
        }
    }
}

// executar a função connect do Redux para:
// 1) mapear o State do Redux à propriedades locais do componente (mapStateToProps)
// 2) mapear as ações a serem invocadas às ações locais nas props do componente (mapDispatchToProps)
const MasterDetail = connect(mapStateToProps, mapDispatchToProps)(MasterDetail);

export default MasterDetail;
