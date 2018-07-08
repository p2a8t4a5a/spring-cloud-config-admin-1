const editButton = (vm, h, currentRow, index) => {
    return h('Button', {
        props: {
            type: 'text',
            icon: currentRow.editting ? 'checkmark' : 'edit',
            loading: currentRow.saving
        },
        style: {
            margin: '0'
        },
        on: {
            'click': () => {
                if (!currentRow.editting) {
                    if (currentRow.edittingCell) {
                        for (let name in currentRow.edittingCell) {
                            currentRow.edittingCell[name] = false;
                            vm.edittingStore[index].edittingCell[name] = false;
                        }
                    }
                    vm.edittingStore[index].editting = true;
                    vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore));
                } else {
                    vm.edittingStore[index].saving = true;
                    vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore));
                    let edittingRow = vm.edittingStore[index];
                    edittingRow.editting = false;
                    edittingRow.saving = false;
                    vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore));
                    vm.$emit('input', vm.handleBackdata(vm.thisTableData));
                    vm.$emit('on-change', vm.handleBackdata(vm.thisTableData), index);
                }
            }
        }
    });
};
const deleteButton = (vm, h, currentRow, index) => {
    return h('Poptip', {
        props: {
            confirm: true,
            title: 'Are you sure you want to delete this data ?',
            transfer: true
        },
        on: {
            'on-ok': () => {
                //vm.thisTableData.splice(index, 1);
                vm.$emit('input', vm.handleBackdata(vm.thisTableData));
                vm.$emit('on-delete', vm.handleBackdata(vm.thisTableData), index);
            }
        }
    }, [
        h('Button', {
            style: {
                color: 'red'
            },
            props: {
                type: 'text',
                icon: 'trash-b',
                placement: 'top'
            }
        })
    ]);
};


const EditTable = {
    template: `
            <div>
            <Table :size="size" :ref="refs" :columns="tableColumns" :data="thisTableData" border></Table>
            </div>
    `,
    name: 'EditTable',
    props: {
        refs: String,
        tableColumns: Array,
        tableData: Array,
        size: String,
        url: String
    },
    data() {
        return {
            columns: [],
            thisTableData: [],
            edittingStore: []
        };
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            let vm = this;
            let editableCell = this.tableColumns.filter(item => {
                if (item.editable) {
                    if (item.editable === true) {
                        return item;
                    }
                }
            });
            let cloneData = JSON.parse(JSON.stringify(this.tableData));
            let res = [];
            res = cloneData.map((item, index) => {
                let isEditting = false;
                if (this.thisTableData[index]) {
                    if (this.thisTableData[index].editting) {
                        isEditting = true;
                    } else {
                        for (const cell in this.thisTableData[index].edittingCell) {
                            if (this.thisTableData[index].edittingCell[cell] === true) {
                                isEditting = true;
                            }
                        }
                    }
                }
                if (isEditting) {
                    return this.thisTableData[index];
                } else {
                    this.$set(item, 'editting', false);
                    let edittingCell = {};
                    editableCell.forEach(item => {
                        edittingCell[item.key] = false;
                    });
                    this.$set(item, 'edittingCell', edittingCell);
                    return item;
                }
            });
            this.thisTableData = res;
            this.edittingStore = JSON.parse(JSON.stringify(this.thisTableData));
            this.tableColumns.forEach(item => {
                if (item.editable) {
                    item.render = (h, param) => {
                        let currentRow = this.thisTableData[param.index];
                        if (!currentRow.editting) {
                            return h('span', currentRow[item.key]);
                        } else {
                            return h('Input', {
                                props: {
                                    type: 'textarea',
                                    value: currentRow[item.key],
                                    autosize: {minRows: 1, maxRows: 20}
                                },
                                on: {
                                    'on-change'(event) {
                                        let key = param.column.key;
                                        vm.edittingStore[param.index][key] = event.target.value;
                                    }
                                }
                            });
                        }
                    };
                }
                if (item.handle) {
                    item.render = (h, param) => {
                        let currentRowData = this.thisTableData[param.index];
                        let children = [];
                        item.handle.forEach(item => {
                            if (item === 'edit') {
                                children.push(editButton(this, h, currentRowData, param.index));
                            } else if (item === 'delete') {
                                children.push(deleteButton(this, h, currentRowData, param.index));
                            }
                        });
                        return h('div', children);
                    };
                }
            });
        },
        handleBackdata(data) {
            let clonedData = JSON.parse(JSON.stringify(data));
            clonedData.forEach(item => {
                delete item.editting;
                delete item.edittingCell;
                delete item.saving;
            });
            return clonedData;
        }
    },
    watch: {
        tableData(data) {
            this.init();
        }
    }
};

export default EditTable






