import EditTable from "../components/EditTable.js"

const Home = {
    template: `
<Layout>
    <Header class="sc-header">
      <a href="/" class="sc-logo-href">
         <img class="sc-logo-img" src="app/ui/static/images/spring-cloud-icon.svg">
         <span class="sc-logo-word">Spring Cloud Config Center</span>
      </a>
    </Header>
    <Layout>
        <Sider hide-trigger class="sc-sider">
            <Card dis-hover>
                <p slot="title">namespace</p>
                <a href="#" slot="extra" @click.prevent="addNamespace"><Icon type="plus-round" color="#68bd45"></Icon></a>
                <ul>
                    <li v-for="(item,index) in namespaceList" 
                    v-bind:class="{ 'sc-sider-li-active': item===currentNamespace }"  
                    v-on:click="handleNamespaceListClick(item)"
                    v-on:mouseover="handleNamespaceListMouseover(index)" v-on:mouseout="handleNamespaceListMouseout">
                        <span>{{ item }}</span>
                        <a v-show="siderNamespaceListHoverIndex===index" href="#" style="position: absolute;right: 16px" @click.stop.prevent="removeNamespace">
                          <Icon type="minus-round"></Icon>
                        </a>
                    </li>
                </ul>
            </Card>
            <Card dis-hover>
                <p slot="title">profile</p>
                <a href="#" slot="extra" @click.prevent="addProfile"><Icon type="plus-round" color="#68bd45"></Icon></a>
                <ul>
                    <li v-for="(item,index) in profileList" 
                    v-bind:class="{ 'sc-sider-li-active': item===currentProfile }" 
                    v-on:click="handleProfileListClick(item)" 
                    v-on:mouseover="handleProfileListMouseover(index)" v-on:mouseout="handleProfileListMouseout">
                      <span>{{ item }}</span>
                      <a v-show="siderProfileListHoverIndex===index" href="#" style="position: absolute;right: 16px" @click.stop.prevent="removeProfile">
                        <Icon type="minus-round"></Icon>
                      </a>
                    </li>
                </ul>
            </Card>
            <Card dis-hover>
                <p slot="title">label</p>
                <a href="#" slot="extra" @click.prevent="addLabel"><Icon type="plus-round" color="#68bd45"></Icon></a>
                <ul>
                    <li v-for="(item,index) in labelList" 
                    v-bind:class="{ 'sc-sider-li-active': item===currentLabel }" 
                    v-on:click="handleLabelListClick(item)" 
                    v-on:mouseover="handleLabelListMouseover(index)" v-on:mouseout="handleLabelListMouseout">
                      <span>{{ item }}</span>
                      <a v-show="siderLabelListHoverIndex===index" href="#" style="position: absolute;right: 16px" @click.stop.prevent="removeLabel">
                        <Icon type="minus-round"></Icon>
                      </a>
                    </li>
                </ul>
            </Card>
        </Sider>
        <Layout :style="{padding: '0 10px 10px'}">
            <Row type="flex">
                <Col span="20" order="1">
                <Breadcrumb class="main-breadcrumb">
                  <BreadcrumbItem>{{currentNamespace}}</BreadcrumbItem>
                  <BreadcrumbItem>{{currentProfile}}</BreadcrumbItem>
                  <BreadcrumbItem>{{currentLabel}}</BreadcrumbItem>
                 </Breadcrumb>
                </Col>
                <Col span="4" order="2">
                  <div style="padding-top: 5px;float: right;">
                    <Button type="primary" :loading="refreshConfigLoading" v-on:click="refreshConfig"><Icon type="refresh"></Icon> Refresh</Button>
                    <Button type="primary" :loading="addConfigBtnLoading" v-on:click="addConfigBtn"><Icon type="plus"></Icon> Add</Button>
                  </div>
                </Col>
            </Row>
            <Content>
              <div class="content-table">
                <!-- <Table size="small" border :columns="configTableHead" :data="configTableData"></Table> -->
                <EditTable size="small" refs="table2" @on-change="editRowSubmit" @on-delete="deleteRowSubmit" :table-columns="configTableHead" :table-data="configTableData"></EditTable>
              </div>
              <Modal v-model="addConfigTableModal" title="add config" width="660" :loading="true" @on-ok="submitAddConfigs('addConfigForm')">
                    <Form ref="addConfigForm" :model="addConfigForm" :label-width="80" style="width: 600px">
                        <FormItem
                                v-for="(item, index) in addConfigForm.items"
                                v-if="item.status"
                                :key="index"
                                :label="'config ' + item.index"
                                :prop="'items.' + index + '.value'"
                                :rules="{required: true, message: 'config ' + item.index +' can not be empty', trigger: 'blur'}">
                            <Row>
                                <Col span="9">
                                    <Input type="textarea" :autosize="{minRows: 1,maxRows: 10}" v-model="item.key" placeholder="key"></Input>
                                </Col>
                                <Col span="1">
                                    <span style="margin-left: 8px;">=</span>
                                </Col>
                                <Col span="12">
                                    <Input type="textarea" :autosize="{minRows: 1,maxRows: 10}" v-model="item.value" placeholder="value"></Input>
                                </Col>
                                <Col span="2">
                                    <Button style="margin-left: 10px;" type="text" size="small" @click="handleRemoveLine(index)"><Icon type="minus" color="#68bd45"></Icon></Button>
                                </Col>
                            </Row>
                        </FormItem>
                        <FormItem>
                            <Row>
                                <Col span="6">
                                    <Button type="dashed" long @click="handleAddLine" icon="plus-round">Add line</Button>
                                </Col>
                                <Col span="6">
                                    <Button type="dashed" @click="resetAddForm" style="color: red; margin-left: 10px">Reset</Button>
                                </Col>
                            </Row>
                        </FormItem>
                    </Form>
              </Modal>
            </Content>
        </Layout>
    </Layout>
</Layout>
    `,
    components: {EditTable},
    data: function () {
        return {
            configTableHead: [
                {
                    title: 'ID',
                    key: 'id',
                    width: 250
                },
                {
                    title: 'Key',
                    key: 'key',
                    editable: true
                },
                {
                    title: 'Value',
                    key: 'value',
                    editable: true
                },
                {
                    title: 'Namespace',
                    key: 'namespace',
                    editable: true,
                    width: 120
                },
                {
                    title: 'Profile',
                    key: 'profile',
                    editable: true,
                    width: 120
                },
                {
                    title: 'Label',
                    key: 'label',
                    editable: true,
                    width: 120
                },
                {
                    title: 'Operate',
                    key: 'operate',
                    handle: ['edit', 'delete'],
                    width: 90
                }
            ],
            siderNamespaceListHoverIndex: null,
            siderProfileListHoverIndex: null,
            siderLabelListHoverIndex: null,
            addConfigTableModal: false,
            addConfigForm: {
                items: [
                    {
                        key: '',
                        value: '',
                        index: 1,
                        status: 1
                    }
                ]
            },
            refreshConfigLoading: false,
            addConfigBtnLoading: false
        }
    },
    methods: {
        handleNamespaceListClick(item) {
            console.log("handleNamespaceListClick:" + item);
            this.$store.dispatch('setCurrentNamespace', item);
        },
        handleProfileListClick(item) {
            console.log("handleProfileListClick:" + item);
            this.$store.dispatch('setCurrentProfile', item);
        },
        handleLabelListClick(item) {
            console.log("handleLabelListClick:" + item);
            this.$store.dispatch('setCurrentLabel', item);
        },
        handleNamespaceListMouseover(index) {
            this.siderNamespaceListHoverIndex = index;
        },
        handleNamespaceListMouseout() {
            this.siderNamespaceListHoverIndex = null;
        },
        handleProfileListMouseover(index) {
            this.siderProfileListHoverIndex = index;
        },
        handleProfileListMouseout() {
            this.siderProfileListHoverIndex = null;
        },
        handleLabelListMouseover(index) {
            this.siderLabelListHoverIndex = index;
        },
        handleLabelListMouseout() {
            this.siderLabelListHoverIndex = null;
        },
        addNamespace() {

        },
        removeNamespace() {
            console.log("removeNamespace");
        },
        addProfile() {

        },
        removeProfile() {

        },
        addLabel() {

        },
        removeLabel() {

        },
        refreshConfig() {
            this.refreshConfigLoading = true;
            this.$store.dispatch('getConfigs').then(success => {
                this.$Message.success('refresh success!');
                this.refreshConfigLoading = false;
            }, error => {
                this.$Message.error('refresh failed!');
                this.refreshConfigLoading = false;
            });

        },
        addConfigBtn() {
            this.addConfigTableModal = true;
        },
        handleAddLine() {
            this.index++;
            this.addConfigForm.items.push({
                key: '',
                value: '',
                index: this.index,
                status: 1
            });
        },
        handleRemoveLine(index) {
            this.addConfigForm.items[index].status = 0;
        },
        submitAddConfigs(formName) {
            console.log("submitAddConfigs: " + formName);
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.addConfigTableModal = false;
                    this.addConfigBtnLoading = true;
                    //submit
                    let dataParams = this.addConfigForm.items.filter(x => x.status === 1).map(x => {
                        return {key: x.key, value: x.value}
                    });
                    this.$store.dispatch('postConfigs', JSON.stringify(dataParams)).then(success => {
                        this.$store.dispatch('getConfigs');
                        this.$Message.success('add success!');
                        this.addConfigForm.items = [{key: '', value: '', index: 1, status: 1}];
                        this.index = 1;
                        this.addConfigBtnLoading = false;
                    }, error => {
                        this.$Message.error('submit failed!');
                        this.addConfigBtnLoading = false;
                    });
                } else {
                    this.$Message.error('param chick failed!');
                    this.addConfigTableModal = true;
                    console.log(this.addConfigForm.items)
                }
            });
        },
        resetAddForm() {
            this.addConfigForm.items = [{key: '', value: '', index: 1, status: 1}];
            this.index = 1;
        },
        editRowSubmit(value, index) {
            console.log("edit table :" + JSON.stringify(value[index]));
            this.$store.dispatch('updateConfig', JSON.stringify(value[index])).then(success => {
                this.$store.dispatch('getConfigs');
                this.$Message.success('The data in row ' + (index + 1) + ' (id: ' + value[index].id + ')' + ' was modified successfully.');
            }, error => {
                this.$Message.error('update failed!');
            });
        },
        deleteRowSubmit(value, index) {
            console.log("delete table :" + JSON.stringify(value[index]));
            this.$store.dispatch('deleteConfig', value[index].id).then(success => {
                this.$store.dispatch('getConfigs');
                this.$Message.success('The data in row ' + (index + 1) + ' (id: ' + value[index].id + ')' + ' was delete successfully.');
            }, error => {
                this.$Message.error('delete failed!');
            });
        }
    },
    computed: {
        namespaceList: function () {
            return this.$store.state.namespace.namespaces
        },
        currentNamespace: function () {
            return this.$store.state.namespace.currentNamespace
        },
        profileList: function () {
            return this.$store.state.profile.profiles
        },
        currentProfile: function () {
            return this.$store.state.profile.currentProfile
        },
        labelList: function () {
            return this.$store.state.label.labels
        },
        currentLabel: function () {
            return this.$store.state.label.currentLabel
        },
        currentNamespaceAndProfileAndLabel: function () {
            return this.currentNamespace + this.currentProfile + this.currentLabel;
        },
        configTableData: {
            get: function () {
                return this.$store.state.config.configs
            },
            set: function (data) {
                console.log("configTableData set data" + JSON.stringify(data));
            }
        }
    },
    created: async function () {
        await this.$store.dispatch('getNamespaces');
        await this.$store.dispatch('getProfiles');
        await this.$store.dispatch('getLabels');
        await this.$store.dispatch('getConfigs');
    },
    watch: {
        currentNamespace: async function () {
            console.log("watch currentNamespace ...");
            await this.$store.dispatch('getProfiles');
            await this.$store.dispatch('getLabels');
            await this.$store.dispatch('getConfigs');
        },
        currentProfile: async function () {
            console.log("watch currentProfile ...");
            await this.$store.dispatch('getLabels');
            await this.$store.dispatch('getConfigs');
        },
        currentLabel: async function () {
            console.log("watch currentLabel ...");
            await this.$store.dispatch('getConfigs');
        }
    }
};
export default Home
