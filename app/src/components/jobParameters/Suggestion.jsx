import React, { Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete';

/*
 * An AutoComplete text field with suggestions from a given list of
 * identifiable objects.
 */
class Suggestion extends Component {
    state = {
        input: '',
    };

    componentDidMount = () => {
        const input = this.props.selected ? this.getNameOfSelection(this.props.selected) : '';
        if (input) {
            this.setState({
                input,
            });
        }
    };

    onSuggestionClick = (chosenRequest, index) => {
        if (index !== -1) {
            this.props.onChange(chosenRequest.id);
        }
    };

    updateInput = input => {
        this.setState({
            input,
        });
    };

    getNameOfSelection = id => {
        const selected = this.props.suggestions.find(suggestion => suggestion.id === id);
        return selected ? selected.displayName : '';
    };

    render = () => (
        <div style={{ marginBottom: 16 }}>
            <AutoComplete
                fullWidth
                searchText={this.state.input}
                floatingLabelText={this.props.label}
                filter={AutoComplete.fuzzyFilter}
                dataSource={this.props.suggestions}
                dataSourceConfig={{ text: 'displayName', value: 'id' }}
                onNewRequest={this.onSuggestionClick}
                onUpdateInput={this.updateInput}
            />
        </div>
    );
}

export default Suggestion;
