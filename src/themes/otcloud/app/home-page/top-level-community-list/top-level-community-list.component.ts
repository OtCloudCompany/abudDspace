import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { TopLevelCommunityListComponent as BaseComponent } from '../../../../../app/home-page/top-level-community-list/top-level-community-list.component';
import { APP_CONFIG, AppConfig } from '../../../../../config/app-config.interface';
import { CommunityDataService } from '../../../../../app/core/data/community-data.service';
import { PaginationService } from '../../../../../app/core/pagination/pagination.service';
import { Community } from '../../../../../app/core/shared/community.model';
import { DSONameService } from '../../../../../app/core/breadcrumbs/dso-name.service';

interface CommunityCard {
  name: string;
  uuid: string;
  itemsCount: number;
  image: string;
}

const IMAGE_PATH = '/assets/otcloud/images/';

/**
 * Card image per top-level community, keyed by UUID so the image stays with its community
 * regardless of sort order or pagination. Communities not listed here use DEFAULT_IMAGE.
 */
const COMMUNITY_IMAGES: { [uuid: string]: string } = {
  'c6d4f8ce-3296-4eac-8072-9da91c7817e4': '1.webp',        // restricted (visible to logged-in users)
  'a5efbfd2-9e38-48a8-84c4-2355aa6bc028': 'eventos.webp',  // Eventos
  'c21b37f6-2247-4c4f-92f5-0d5f3183935e': '5.webp',        // restricted (visible to logged-in users)
  '5dfefdff-e685-4375-8849-fece206202f8': '2.webp',        // Memoria histórica
  'cfb71eb5-8a51-47d6-9ba7-4346570074f3': '3.webp',        // Publicaciones de la ABUD
  '38a55fd8-bd53-47ef-ae9f-63cc3e18ea76': '4.webp',        // Recursos de aprendizaje
  'c76f5ff6-2b5b-4768-bfb1-aa5aaa2f37aa': '7.webp',        // restricted (visible to logged-in users)
};

const DEFAULT_IMAGE = '6.webp';

@Component({
  selector: 'ds-top-level-community-list',
  styleUrls: ['../../../../../app/home-page/top-level-community-list/top-level-community-list.component.scss'],
  templateUrl: './top-level-community-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopLevelCommunityListComponent extends BaseComponent {
  /**
   * The current page of top-level communities, mapped to the data the cards need
   */
  readonly communities$: Observable<CommunityCard[]> = this.communitiesRD$.pipe(
    map((rd) => rd?.hasSucceeded ? rd.payload?.page : undefined),
    distinctUntilChanged(),
    map((page: Community[]) => (page ?? []).map((community) => ({
      name: this.dsoNameService.getName(community),
      uuid: community.uuid,
      itemsCount: Math.max(community.archivedItemsCount ?? 0, 0),
      image: IMAGE_PATH + (COMMUNITY_IMAGES[community.uuid] ?? DEFAULT_IMAGE),
    }))),
  );

  constructor(@Inject(APP_CONFIG) protected appConfig: AppConfig,
              cds: CommunityDataService,
              paginationService: PaginationService,
              protected dsoNameService: DSONameService) {
    super(appConfig, cds, paginationService);
  }

  trackByUuid(_index: number, community: CommunityCard): string {
    return community.uuid;
  }
}
