import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { pesquisarLeis } from '../../store/actions';

import './BotoesPaginacao.css';
class BotoesPaginacao extends Component {

	prepararRangeBotoes(paginaAtual, totalPaginas) {

		let startingRange = [
			paginaAtual - 2,
			paginaAtual - 1,
			paginaAtual,
			paginaAtual + 1,
			paginaAtual + 2
		];

		let range = [];
		for (let p of startingRange) {
			if (p >= 1) {
				range.push(p);
			}
		}

		while (range.length < 5)
			range.push(range[range.length - 1] + 1);

		while (range[range.length - 1] > totalPaginas)
			range.pop();

		while (range.length < 5 && range[0] > 1)
			range.unshift(range[0] - 1);

		return (
			<React.Fragment>
				<button onClick={() => this.onClickBotao(1)} disabled={paginaAtual === 1} key='p-1'> Primeira Página </button>
				{range.map(p => (
					<button onClick={() => this.onClickBotao(p)} disabled={paginaAtual === p} key={p}> {p} </button>
				))}
				<button onClick={() => this.onClickBotao(totalPaginas)} disabled={paginaAtual === totalPaginas} key='p-x'> Última Página </button>
			</React.Fragment>
		);
	}

	onClickBotao(newP) {

		let params = this.props.match.params;

		this.props.pesquisarLeis({
			q: this.props.pesquisa.q,
			p: newP,
			localSlug: params.localSlug
		}, this.props.history);
	}

	render() {

		return (
			<div className="BotoesPaginacao">
				{
					this.props.pesquisa.paginas && this.props.pesquisa.paginas > 1
						? this.prepararRangeBotoes(this.props.pesquisa.p, this.props.pesquisa.paginas)
						: null
				}
			</div>
		);
	}
}

function mapStateToProps({ local, pesquisa }) {
	return { local, pesquisa };
}

function mapDispatchToProps(dispatch) {
	return {
		pesquisarLeis: bindActionCreators(pesquisarLeis, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(BotoesPaginacao);