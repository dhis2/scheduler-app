import React from 'react';
import Chip from 'material-ui/Chip';
import AutoComplete from 'material-ui/AutoComplete';

const styles = {
    chip: { margin: 4 },
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
    },
};

class AutoCompleteSelect extends React.Component {
    state = {
        searchText: '',
    };

    handleInput = searchText => {
        this.setState({
            searchText,
        });
    };

    handleSelection = (selected) => {
        const { value, onChange, options } = this.props;
        const existingSelections = value || [];

        this.setState({
            searchText: '',
        });

        // If the user selected an item directly
        if (selected.id) {
            return onChange([...existingSelections, selected.id]);
        }


        // If the user pressed enter, check if the string matches a displayName (case insensitive)
        const match = options.find(option => option.displayName.toLowerCase() === selected.toLowerCase());
        const isAlreadySelected = value && value.includes(match.id);

        if (match && !isAlreadySelected) {
            return onChange([...existingSelections, match.id]);
        }

        return undefined;
    };

    handleItemDelete = targetId => {
        const { onChange, value } = this.props;
        const filteredValues = value.filter(id => id !== targetId);

        onChange(filteredValues);
    };

    render() {
        const { options, value } = this.props;
        const availableOptions = value ? options.filter(option => !value.includes(option.id)) : options;
        const selectedOptions = value ? value.map(id => options.find(option => id === option.id)) : [];

        return (
            <div style={{ marginBottom: 16 }}>
                <AutoComplete
                    fullWidth
                    searchText={this.state.searchText}
                    floatingLabelText={this.props.label}
                    filter={AutoComplete.fuzzyFilter}
                    dataSource={availableOptions}
                    dataSourceConfig={{ text: 'displayName', value: 'id' }}
                    onUpdateInput={this.handleInput}
                    onNewRequest={this.handleSelection}
                />
                <div style={styles.wrapper}>
                    {selectedOptions.map(({ id, displayName }) => (
                        <Chip
                            key={id}
                            style={styles.chip}
                            onRequestDelete={() => this.handleItemDelete(id)}
                        >
                            {displayName}
                        </Chip>
                    ))}
                </div>
            </div>
        );
    }
}

export default AutoCompleteSelect;
