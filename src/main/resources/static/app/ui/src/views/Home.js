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
        <Sider hide-trigger>
            <Card>
                <p slot="title">
                  <Icon type="ios-world-outline"></Icon>
                    Namespace
                </p>
                <a href="#" slot="extra" @click.prevent="changeLimit">
                    <Icon type="ios-plus-outline"></Icon>
                </a>
                <ul>
                    <li v-for="item in namespaceList" v-on:click="handleNamespaceListClick(item)">
                        <a :href="item.url" target="_blank">{{ item }}</a> 
                        <a href="#" slot="extra" @click.prevent="changeLimit">
                        <Icon type="ios-minus-outline"></Icon>
                        </a>
                    </li>
                </ul>
            </Card>
            <Card>
                <p slot="title">
                    <Icon type="soup-can-outline"></Icon>
                    Profile
                </p>
                <a href="#" slot="extra" @click.prevent="changeLimit">
                    <Icon type="ios-plus-outline"></Icon>
                </a>
                <ul>
                    <li v-for="item in profileList" v-on:click="handleProfileListClick(item)">
                        <a :href="item.url" target="_blank">{{ item }}</a> 
                        <a href="#" slot="extra" @click.prevent="changeLimit">
                        <Icon type="ios-minus-outline"></Icon>
                        </a>
                    </li>
                </ul>
            </Card>
            <Card>
                <p slot="title">
                    <Icon type="ios-list-outline"></Icon>
                    Label
                </p>
                <a href="#" slot="extra" @click.prevent="changeLimit">
                    <Icon type="ios-plus-outline"></Icon>
                </a>
                <ul>
                    <li v-for="item in labelList" v-on:click="handleLabelListClick(item)">
                        <a :href="item.url" target="_blank">{{ item }}</a>
                        <a href="#" slot="extra" @click.prevent="changeLimit">
                        <Icon type="ios-minus-outline"></Icon>
                        </a>
                    </li>
                </ul>
            </Card>
        </Sider>
        <Layout :style="{padding: '0 10px 10px'}">
            <Breadcrumb class="main-breadcrumb">
                <BreadcrumbItem>{{currentNamespace}}</BreadcrumbItem>
                <BreadcrumbItem>{{currentProfile}}</BreadcrumbItem>
                <BreadcrumbItem>{{currentLabel}}</BreadcrumbItem>
            </Breadcrumb>
            <Content>
              <div>
                <Table size="small" border :columns="configTableHead" :data="configTableData"></Table>
              </div>
            </Content>
        </Layout>
    </Layout>
</Layout>
    `,
    data: function () {
        return {
            configTableHead: [
                {
                    title: 'ID',
                    key: 'id'
                },
                {
                    title: 'Key',
                    key: 'key'
                },
                {
                    title: 'Value',
                    key: 'value'
                },
                {
                    title: 'Namespace',
                    key: 'namespace'
                },
                {
                    title: 'Profile',
                    key: 'profile'
                },
                {
                    title: 'Label',
                    key: 'label'
                }
            ]
        }
    },
    methods: {
        handleNamespaceListClick(item) {
            console.log("handleNamespaceListClick:" + item);
            this.$store.dispatch('setCurrentNamespace', item);
        },
        handleProfileListClick(item) {
            console.log("handleProfileListClick:" + item);
        },
        handleLabelListClick(item) {
            console.log("handleLabelListClick:" + item);
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
        configTableData: function () {
            return this.$store.state.config.configs
        }
    },
    created: async function () {
        await this.$store.dispatch('getNamespaces');
        await this.$store.dispatch('getProfiles');
        await this.$store.dispatch('getLabels');
        await this.$store.dispatch('getConfigs');
    },
    watch: {
        currentNamespaceAndProfileAndLabel: async function () {
            console.log("watch namespace ...");
            await this.$store.dispatch('getProfiles');
            await this.$store.dispatch('getLabels');
            await this.$store.dispatch('getConfigs');
        }
    }
};
export default Home
