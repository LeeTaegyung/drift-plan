import {
  AccommodationCardFormValues,
  AttractionCardFormValues,
  EtcCardFormValues,
  FlightCardFormValues,
  ScheduleCardFormValues,
  TourCardFormValues,
  TransportCardFormValues,
} from '@/features/trips/tripSchedule/model/scheduleForm.schema';
import AccommodationDetailCard from '@/features/trips/tripSchedule/ui/TripScheduleContent/TripScheduleDetail/AccommodationDetailCard';
import AttractionDetailCard from '@/features/trips/tripSchedule/ui/TripScheduleContent/TripScheduleDetail/AttractionDetailCard';
import EtcDetailCard from '@/features/trips/tripSchedule/ui/TripScheduleContent/TripScheduleDetail/EtcDetailCard';
import FlightDetailCard from '@/features/trips/tripSchedule/ui/TripScheduleContent/TripScheduleDetail/FlightDetailCard';
import TourDetailCard from '@/features/trips/tripSchedule/ui/TripScheduleContent/TripScheduleDetail/TourDetailCard';
import TransportDetailCard from '@/features/trips/tripSchedule/ui/TripScheduleContent/TripScheduleDetail/TransportDetailCard';

interface Props {
  card_type: ScheduleCardFormValues['card_type'];
  detail: ScheduleCardFormValues['detail'];
}

export default function TripScheduleDetail({ card_type, detail }: Props) {
  switch (card_type) {
    case 'flight':
      return (
        <FlightDetailCard detail={detail as FlightCardFormValues['detail']} />
      );
    case 'accommodation':
      return (
        <AccommodationDetailCard
          detail={detail as AccommodationCardFormValues['detail']}
        />
      );
    case 'transport':
      return (
        <TransportDetailCard
          detail={detail as TransportCardFormValues['detail']}
        />
      );
    case 'attraction':
      return (
        <AttractionDetailCard
          detail={detail as AttractionCardFormValues['detail']}
        />
      );
    case 'tour':
      return <TourDetailCard detail={detail as TourCardFormValues['detail']} />;
    case 'etc':
      return <EtcDetailCard detail={detail as EtcCardFormValues['detail']} />;
  }

  return null;
}
