import { createConnectedWallet, } from '@terra-money/wallet-types';
import { useMemo } from 'react';
import { useWallet } from './useWallet';
export function useConnectedWallet() {
    const { status, network, wallets, post, sign, signBytes, supportFeatures, connection, } = useWallet();
    return useMemo(() => {
        return createConnectedWallet({
            status,
            network,
            wallets,
            post,
            sign,
            signBytes,
            supportFeatures,
            connection,
        });
    }, [
        connection,
        network,
        post,
        sign,
        signBytes,
        status,
        supportFeatures,
        wallets,
    ]);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlQ29ubmVjdGVkV2FsbGV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL0B0ZXJyYS1tb25leS91c2Utd2FsbGV0L3VzZUNvbm5lY3RlZFdhbGxldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRUwscUJBQXFCLEdBQ3RCLE1BQU0sMkJBQTJCLENBQUM7QUFDbkMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUNoQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRXhDLE1BQU0sVUFBVSxrQkFBa0I7SUFDaEMsTUFBTSxFQUNKLE1BQU0sRUFDTixPQUFPLEVBQ1AsT0FBTyxFQUNQLElBQUksRUFDSixJQUFJLEVBQ0osU0FBUyxFQUNULGVBQWUsRUFDZixVQUFVLEdBQ1gsR0FBRyxTQUFTLEVBQUUsQ0FBQztJQUVoQixPQUFPLE9BQU8sQ0FBOEIsR0FBRyxFQUFFO1FBQy9DLE9BQU8scUJBQXFCLENBQUM7WUFDM0IsTUFBTTtZQUNOLE9BQU87WUFDUCxPQUFPO1lBQ1AsSUFBSTtZQUNKLElBQUk7WUFDSixTQUFTO1lBQ1QsZUFBZTtZQUNmLFVBQVU7U0FDWCxDQUFDLENBQUM7SUFDTCxDQUFDLEVBQUU7UUFDRCxVQUFVO1FBQ1YsT0FBTztRQUNQLElBQUk7UUFDSixJQUFJO1FBQ0osU0FBUztRQUNULE1BQU07UUFDTixlQUFlO1FBQ2YsT0FBTztLQUNSLENBQUMsQ0FBQztBQUNMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb25uZWN0ZWRXYWxsZXQsXG4gIGNyZWF0ZUNvbm5lY3RlZFdhbGxldCxcbn0gZnJvbSAnQHRlcnJhLW1vbmV5L3dhbGxldC10eXBlcyc7XG5pbXBvcnQgeyB1c2VNZW1vIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlV2FsbGV0IH0gZnJvbSAnLi91c2VXYWxsZXQnO1xuXG5leHBvcnQgZnVuY3Rpb24gdXNlQ29ubmVjdGVkV2FsbGV0KCk6IENvbm5lY3RlZFdhbGxldCB8IHVuZGVmaW5lZCB7XG4gIGNvbnN0IHtcbiAgICBzdGF0dXMsXG4gICAgbmV0d29yayxcbiAgICB3YWxsZXRzLFxuICAgIHBvc3QsXG4gICAgc2lnbixcbiAgICBzaWduQnl0ZXMsXG4gICAgc3VwcG9ydEZlYXR1cmVzLFxuICAgIGNvbm5lY3Rpb24sXG4gIH0gPSB1c2VXYWxsZXQoKTtcblxuICByZXR1cm4gdXNlTWVtbzxDb25uZWN0ZWRXYWxsZXQgfCB1bmRlZmluZWQ+KCgpID0+IHtcbiAgICByZXR1cm4gY3JlYXRlQ29ubmVjdGVkV2FsbGV0KHtcbiAgICAgIHN0YXR1cyxcbiAgICAgIG5ldHdvcmssXG4gICAgICB3YWxsZXRzLFxuICAgICAgcG9zdCxcbiAgICAgIHNpZ24sXG4gICAgICBzaWduQnl0ZXMsXG4gICAgICBzdXBwb3J0RmVhdHVyZXMsXG4gICAgICBjb25uZWN0aW9uLFxuICAgIH0pO1xuICB9LCBbXG4gICAgY29ubmVjdGlvbixcbiAgICBuZXR3b3JrLFxuICAgIHBvc3QsXG4gICAgc2lnbixcbiAgICBzaWduQnl0ZXMsXG4gICAgc3RhdHVzLFxuICAgIHN1cHBvcnRGZWF0dXJlcyxcbiAgICB3YWxsZXRzLFxuICBdKTtcbn1cbiJdfQ==