import Layout from '../components/layout/Layout'
import Card from '../components/common/Card'

export default function Statistics() {
    return (
        <Layout>
            <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-900">Statistics</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card title="Total Sessions">
                        <p className="text-4xl font-bold text-blue-600">0</p>
                        <p className="text-sm text-gray-500 mt-2">All time</p>
                    </Card>

                    <Card title="Focus Time">
                        <p className="text-4xl font-bold text-green-600">0h</p>
                        <p className="text-sm text-gray-500 mt-2">Total hours</p>
                    </Card>

                    <Card title="Tasks Completed">
                        <p className="text-4xl font-bold text-purple-600">0</p>
                        <p className="text-sm text-gray-500 mt-2">All time</p>
                    </Card>

                    <Card title="Current Streak">
                        <p className="text-4xl font-bold text-orange-600">0</p>
                        <p className="text-sm text-gray-500 mt-2">Days</p>
                    </Card>
                </div>

                <Card title="Coming Soon">
                    <p className="text-gray-600 text-center py-8">
                        📊 Detailed statistics and charts will be available soon!
                    </p>
                </Card>
            </div>
        </Layout>
    )
}
