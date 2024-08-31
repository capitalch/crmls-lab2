import ContentContainer, {containerProps} from "../components/content/ContentContainer";

const Legal = () => {
    const props:containerProps = {
        title: "Legal Notices",
        actions: null,
    }

    const content = <div className="text-sm text-gray-700 px-6 py-4 space-y-3">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lorem justo, congue et dictum quis, ullamcorper sit amet augue. Donec et convallis ante, ac cursus augue. Curabitur et sem non enim condimentum lacinia. Curabitur scelerisque tellus sapien, nec viverra lorem eleifend quis. Vivamus nisi enim, convallis eget feugiat sit amet, cursus non velit. Aenean a consequat turpis. Sed pretium lacus sapien, vel ultricies purus tempus ac. Vivamus finibus tellus quis nisl fermentum, id pulvinar dolor sodales. Duis sed nisl vitae mi auctor euismod at sed ligula. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut feugiat eros, id rutrum diam. Nulla nulla erat, tincidunt eu fermentum non, convallis ut lacus. Donec hendrerit egestas nibh sit amet dignissim. Quisque eget leo tincidunt metus pellentesque viverra ut varius massa.</p>
        <p>Etiam pharetra convallis fringilla. Etiam nunc dui, sagittis nec felis id, consectetur dictum arcu. In hac habitasse platea dictumst. Nunc at augue lobortis libero tempor porttitor. Praesent condimentum consectetur felis. Cras lobortis congue nunc, id pharetra eros consectetur ac. Integer et erat sed eros lobortis semper. Mauris aliquam luctus nibh, vel vestibulum tortor pellentesque vel. Praesent ac urna sed turpis lacinia venenatis a eget quam.</p>
        <p>Quisque ac elit cursus leo pulvinar egestas et vel diam. Suspendisse in ornare turpis. Morbi ornare enim quis augue sodales, id efficitur lectus vestibulum. Duis vel nunc quis tellus sodales lobortis eu accumsan dui. Curabitur vel sem vitae urna eleifend posuere in eu urna. Mauris magna dui, convallis laoreet euismod in, bibendum in velit. Pellentesque ac pretium ipsum. Fusce maximus ipsum nec hendrerit pulvinar. Praesent eu suscipit augue, quis fringilla mauris. Nulla sagittis vitae sapien vel varius. Proin id urna massa. Proin non libero orci. Duis rutrum purus ac urna facilisis, a vehicula orci bibendum.</p>
        <p>Integer ex dolor, hendrerit a consectetur eu, aliquam eget sem. Vivamus maximus magna ac nunc vulputate, eget malesuada quam sagittis. Curabitur sollicitudin libero vel semper porta. Cras lobortis tortor et arcu euismod, non hendrerit metus aliquam. In ut lorem risus. Donec tincidunt leo in pharetra rutrum. In tincidunt congue ipsum, ac pretium justo luctus tincidunt. Cras quis porttitor est. Fusce rhoncus massa nec metus tincidunt, ut convallis nisl lacinia. Fusce sed quam semper, suscipit ipsum et, sodales risus.</p>
        <p>Quisque vestibulum et augue non fermentum. Mauris maximus efficitur scelerisque. Suspendisse eu lectus quam. Donec quis risus lacus. Fusce lacus dolor, dictum ac maximus aliquet, sollicitudin vitae felis. Sed volutpat laoreet sapien nec pharetra. Maecenas ut nunc et ex consectetur euismod. Nullam ut consectetur arcu, ac viverra nunc. Vivamus et tortor magna. Aenean massa nisl, pulvinar et metus pretium, molestie accumsan velit. Morbi a vehicula magna, sit amet sagittis orci. Sed venenatis iaculis sapien.</p>
    </div>

    return (
        <>
            <ContentContainer title={props.title} actions={props.actions}>
                {content}
            </ContentContainer>
        </>
    );
}

export default Legal;