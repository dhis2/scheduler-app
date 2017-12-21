import React, { Component } from 'react';
import Chip from 'material-ui/Chip';
import AutoComplete from 'material-ui/AutoComplete';

const styles = {
    chip: { margin: 4 },
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
    },
};

/*
 * An AutoComplete text field with suggestions from a given list of
 * identifiable objects. Selected objects are shown as chips below.
 */
class SuggestionList extends Component {
    state = {
        input: null,
    };

    onSuggestionClick = (chosenRequest, index) => {
        this.wipeInput();

        if (index !== -1) {
            this.props.onChange([...this.props.selected, this.props.suggestions[index].id]);
        }
    };

    onSelectionClick = id => () => {
        this.props.onChange(this.props.selected.filter(item => item !== id));
    };

    wipeInput = () => {
        this.setState({
            input: '',
        });
    };

    updateInput = input => {
        this.setState({
            input,
        });
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
                onUpdateInput={this.updateInput}
                onNewRequest={this.onSuggestionClick}
            />

            <div style={styles.wrapper}>
                {this.props.selected.map(id => {
                    const displayName = this.props.suggestions.find(obj => obj.id === id)
                        .displayName;
                    return (
                        <Chip
                            key={id}
                            style={styles.chip}
                            onRequestDelete={this.onSelectionClick(id)}
                        >
                            {displayName}
                        </Chip>
                    );
                })}
            </div>
        </div>
    );
}

export default SuggestionList;
