
export default (restProxyPath: string): Promise<string> => {
    return fetch(`${restProxyPath}/randomJoke`).then(
        (response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(`Error: Received ${response.status}`);
        }
    ).then(
        (response) => response.joke
    );
}
