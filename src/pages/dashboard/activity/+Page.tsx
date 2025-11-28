import { Container, Table, Badge, Center, Pagination } from "@mantine/core";
import { readActivities } from "@directus/sdk";

import TimeAgo from "/src/components/ui/TimeAgo";
import useDirectusRequest from "/src/hooks/useDirectusRequest";
import capitalize from "/src/utils/capitalize";
import useCollectionPagination from "/src/hooks/useCollectionPagination";

const formatCollection = (collection: string) => {
  return capitalize(collection.replace("directus_", ""));
};

const ActivityPage: React.FC = () => {
  const { page, setPage, limit, totalPages } = useCollectionPagination(
    "directus_activity",
    20
  );
  const { data } = useDirectusRequest(
    readActivities({
      sort: ["-timestamp"],
      fields: ["*", { user: ["email"] }],
      page,
      limit,
    })
  );
  return (
    <Container size="sm" py="xs" my="xl">
      <Table mb="xl">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Action</Table.Th>
            <Table.Th>Collection</Table.Th>
            <Table.Th style={{ textAlign: "right" }}>Date</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data?.map((activity) => (
            <Table.Tr key={activity.id}>
              <Table.Td>
                <Badge>{capitalize(activity.action)}</Badge>
              </Table.Td>
              <Table.Td>{formatCollection(activity.collection)}</Table.Td>
              <Table.Td align="right">
                <TimeAgo timestamp={activity.timestamp} />
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      {totalPages > 1 && (
        <Center>
          <Pagination value={page} onChange={setPage} total={totalPages} />
        </Center>
      )}
    </Container>
  );
};

export default ActivityPage;
